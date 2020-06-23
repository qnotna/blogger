import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { PostOverviewService } from '../services/post-overview.service';
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
    private service: PostOverviewService,
    private currentRoute: ActivatedRoute,
  ) {}

  /**
   * Combines two route Observables into one Observable, wrapping route params and queryParams
   * Can be subscribed to and both params are accessible in one Subscription
   */
  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.noContent$ = this.service.noContent$;
    this.noResults$ = this.service.noResults$;
    this.onSearchPage$ = this.service.onSearchPage$;
    combineLatest([
      this.currentRoute.params,
      this.currentRoute.queryParams,
    ])
    .pipe(untilDestroyed(this))
    .subscribe(([params, query]) => {
      this.blogId = params.blogId;
      if (query.q !== undefined) {
        this.posts$ = this.service.searchPosts(params.blogId, query.q);
      } else {
        this.posts$ = this.service.getPosts(params.blogId);
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
    this.dialogRef = this.service.openDialog(post);
    this.dialogRef.afterClosed().subscribe((body: PostRequestBody) => {
      if (body) {
        this.service.editPost(this.blogId, body)
          .pipe(untilDestroyed(this))
          .subscribe((editedPost: Post) => this.fetchPosts());
      }
    });
  }

  onPostingPost(): void {
    this.dialogRef = this.service.openDialog(this.blogId);
    this.dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((body: PostRequestBody) => {
        if (body) {
          this.service.createPost(this.blogId, body)
            .pipe(untilDestroyed(this))
            .subscribe((editedPost: Post) => this.fetchPosts());
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
    this.isLoading$.next(false);
    this.noContent$.next(false);
    this.noResults$.next(false);
    this.onSearchPage$.next(false);
  }
}
