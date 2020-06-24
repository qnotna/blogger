import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../../models/posts.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { PostRequestBody } from 'src/app/models/post-request-body.model';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialogRef } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-post-detailview',
  templateUrl: './post-detailview.component.html',
  styleUrls: ['./post-detailview.component.scss'],
})
export class PostDetailviewComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  isLoading$: BehaviorSubject<boolean>;
  private dialogRef: MatDialogRef<PostDialogComponent>;

  constructor(
    private currentRoute: ActivatedRoute,
    private postService: PostService,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.postService.isLoading$;
    this.currentRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        this.post$ = this.postService.getPostById(
          params.postId,
          params.blogId,
        );
      });
  }

  ngOnDestroy(): void {
    this.isLoading$.next(false);
  }

  onDelete(post: Post): void {
    this.postService
      .removePostFrom(post.blog.id, post.id)
      .pipe(untilDestroyed(this))
      .subscribe(_ =>
        this.postService.navigateTo(`/home/blogs/${post.blog.id}/posts`),
      );
  }

  /**
   * Opens dialog and subscribes its to closing event, retrieving data to be patched
   * and making related API-call
   * @param post post to be edited
   */
  onEdit(post: Post): void {
    this.dialogRef = this.postService.openDialog(post);
    this.dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((body: PostRequestBody) => {
        if (body) {
          this.postService
            .editPost(post.blog.id, body)
            .pipe(untilDestroyed(this))
            .subscribe(
              (editedPost: Post) =>
                (this.post$ = this.postService.getPostById(
                  post.id,
                  post.blog.id,
                )),
            );
        }
      });
  }
}
