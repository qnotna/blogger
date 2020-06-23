import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { PostService } from '../services/post-overview.service';
import { DeleteRequestBody, PostRequestBody } from 'src/app/models/post-request-body.model';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialogRef } from '@angular/material/dialog';
import { PostDialogComponent } from '../components/post-dialog/post-dialog.component';

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
  onSearchPage$: BehaviorSubject<boolean>;
  private dialogRef: MatDialogRef<PostDialogComponent>;
  private blogId: string;

  constructor(
    private postService: PostService,
    private currentRoute: ActivatedRoute,
  ) {}

  /**
   * Combines two route Observables into one Observable, wrapping route params and queryParams
   * Can be subscribed to and both params are accessible in one Subscription
   */
  ngOnInit(): void {
    this.isLoading$ = this.postService.isLoading$;
    this.noContent$ = this.postService.noContent$;
    this.noResults$ = this.postService.noResults$;
    this.onSearchPage$ = this.postService.onSearchPage$;
    combineLatest([
      this.currentRoute.params,
      this.currentRoute.queryParams,
    ])
    .pipe(untilDestroyed(this))
    .subscribe(([params, query]) => {
      this.blogId = params.blogId;
      if (query.q !== undefined) {
        this.posts$ = this.postService.searchPosts(params.blogId, query.q);
      } else {
        this.posts$ = this.postService.getPosts(params.blogId);
      }
    });

  }

  onShowDetail(postId: string): void {
    this.postService.handleShowDetail(this.blogId, postId);
  }

  removePostFrom(body: DeleteRequestBody): void {
    this.postService.removePostFrom(body.blogId, body.postId).subscribe(_ => this.fetchPosts());
  }

  onOpenEdit(post: Post): void {
    this.dialogRef = this.postService.openDialog(post);
    this.dialogRef.afterClosed().subscribe((body: PostRequestBody) => {
      if (body) {
        this.postService.editPost(this.blogId, body)
          .pipe(untilDestroyed(this))
          .subscribe((editedPost: Post) => this.fetchPosts());
      }
    });
  }

  onPostingPost(): void {
    this.dialogRef = this.postService.openDialog(this.blogId);
    this.dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((body: PostRequestBody) => {
        if (body) {
          this.postService.createPost(this.blogId, body)
            .pipe(untilDestroyed(this))
            .subscribe((editedPost: Post) => this.fetchPosts());
        }
      });
  }

  fetchPosts(): void {
    this.posts$ = this.postService.getPosts(this.blogId);
  }

  reloadAfterSearch(): void {
    this.noResults$.next(false);
    this.postService.navigateTo(`/home/blogs/${this.blogId}/posts`);
  }

  ngOnDestroy(): void {
    this.isLoading$.next(false);
    this.noContent$.next(false);
    this.noResults$.next(false);
    this.onSearchPage$.next(false);
  }
}
