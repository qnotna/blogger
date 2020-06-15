import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { PostOverviewService } from '../services/post-overview.service';
import { BehaviorSubject } from 'rxjs';
import { DeleteRequestBody, PostRequestBody } from 'src/app/models/post-request-body.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrls: ['./post-overview.component.scss'],
})
export class PostOverviewComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  isLoading$: BehaviorSubject<boolean>;
  noContent$: BehaviorSubject<boolean>;
  noResults$: BehaviorSubject<boolean>;
  blogId: string;

  routeSub: Subscription;
  dialogSub: Subscription;
  createPostSub: Subscription;
  editPostSub: Subscription;

  constructor(
    private service: PostOverviewService,
    private currentRoute: ActivatedRoute
  ) {}

  /**
   * Combines two route Observables into one Observable, wrapping route params and queryParams
   * Can be subscribed to and both params are accessible in one Subscription
   */
  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.noContent$ = this.service.noContent$;
    this.noResults$ = this.service.noResults$;
    this.routeSub = combineLatest([
      this.currentRoute.params,
      this.currentRoute.queryParams,
    ])
    .subscribe(([params, query]) => {
      this.blogId = params.blogId;
      if (query.q !== undefined) {
        this.posts$ = this.service.searchPosts(params.blogId, query.q);
      } else {
        this.posts$ = this.service.getPosts(params.blogId);
        this.noResults$.next(false);
      }
    });

  }

  onShowDetail(postId: string): void {
    this.service.handleShowDetail(this.blogId, postId);
  }

  removePostFrom(body: DeleteRequestBody): void {
    this.service.removePostFrom(body.blogId, body.postId).subscribe(_ => this.fetchPosts());
  }

  onOpenEdit(post: Post): void {
    const dialogRef = this.service.openDialog(post);
    this.dialogSub = dialogRef.afterClosed().subscribe((body: PostRequestBody) => {
      if (body) {
        this.editPostSub = this.service.editPost(this.blogId, body).subscribe((editedPost: Post) => this.fetchPosts());
      }
    });
  }

  onPostingPost(): void {
    const dialogRef = this.service.openDialog(this.blogId);
    this.dialogSub = dialogRef.afterClosed().subscribe((body: PostRequestBody) => {
      if (body) {
        this.createPostSub = this.service.createPost(this.blogId, body).subscribe((editedPost: Post) => this.fetchPosts());
      }
    });
  }

  fetchPosts(): void {
    this.posts$ = this.service.getPosts(this.blogId);
  }

  reloadAfterSearch(): void {
    this.noResults$.next(false);
    this.service.navigateTo(`/home/blogs/${this.blogId}/posts`);
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.createPostSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.editPostSub?.unsubscribe();
  }
}
