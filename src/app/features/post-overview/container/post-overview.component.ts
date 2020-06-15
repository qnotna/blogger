import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { ActivatedRoute } from '@angular/router';
import { PostOverviewService } from '../services/post-overview.service';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../components/post-dialog/post-dialog.component';
import { BehaviorSubject } from 'rxjs';

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

  constructor(
    private service: PostOverviewService,
    private currentRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.noContent$ = this.service.noContent$;
    this.noResults$ = this.service.noResults$;
    // Combine 2 Observables into 1 in order to check and make api call based on current url
    this.routeSub = combineLatest([
      this.currentRoute.params,
      this.currentRoute.queryParams
    ])
    .subscribe(([params, query]) => {
      this.blogId = params.blogId;
      if (query.q !== undefined) {
        this.posts$ = this.service.searchPosts(params.blogId, query.q);
      } else {
        this.blogId = params.blogId;
        this.posts$ = this.service.getPosts(params.blogId);
        this.noResults$.next(false);
      }
    });

  }

  onShowDetail(postId: string) {
    console.log('PostOverviewComponent > Clicked Post with id:', postId);
  }

  /**
   * Event handler for deleting posts from `post-item.component.html` event emitter
   * Modifies posts observable
   * @param location contains identifiers for current blog and post
   */
  removePostFrom({ blogId, postId }) {
    this.service.removePostFrom(blogId, postId).subscribe(_ => this.fetchPosts());
  }

  onPostingPost(): void {
    const dialogRef = this.dialog.open(PostDialogComponent, {
      data: { blogId: this.blogId }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(body => {
      if (body) {
        this.createPostSub = this.service.createPost(this.blogId, body).subscribe((createdPost: Post) => this.fetchPosts());
      }
    });
  }

  fetchPosts(): void {
    this.posts$ = this.service.getPosts(this.blogId);
  }

  reloadAfterSearch(): void {
    this.noResults$.next(false);
    this.fetchPosts();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.createPostSub?.unsubscribe();
    this.dialogSub?.unsubscribe();
  }
}
