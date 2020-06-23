import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../../../../models/posts.model";
import { ActivatedRoute, Params } from "@angular/router";
import { PostOverviewService } from "../../services/post-overview.service";
import { Observable, BehaviorSubject } from "rxjs";
import { PostRequestBody } from "src/app/models/post-request-body.model";
import { untilDestroyed } from "ngx-take-until-destroy";
import { MatDialogRef } from "@angular/material/dialog";
import { PostDialogComponent } from "../post-dialog/post-dialog.component";

@Component({
  selector: "app-post-detailview",
  templateUrl: "./post-detailview.component.html",
  styleUrls: ["./post-detailview.component.scss"],
})
export class PostDetailviewComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  isLoading$: BehaviorSubject<boolean>;
  dialogRef: MatDialogRef<PostDialogComponent>;

  constructor(
    private currentRoute: ActivatedRoute,
    private postOverviewService: PostOverviewService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.postOverviewService.isLoading$;
    this.currentRoute.params
      .pipe(untilDestroyed(this))
      .subscribe((params: Params) => {
        this.post$ = this.postOverviewService.getPostById(
          params.postId,
          params.blogId
        );
      });
  }

  ngOnDestroy(): void {
    this.isLoading$.next(false);
  }

  onDelete(post: Post): void {
    this.postOverviewService
      .removePostFrom(post.blog.id, post.id)
      .pipe(untilDestroyed(this))
      .subscribe((_) =>
        this.postOverviewService.navigateTo(`/home/blogs/${post.blog.id}/posts`)
      );
  }

  onEdit(post: Post): void {
    this.dialogRef = this.postOverviewService.openDialog(post);
    this.dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((body: PostRequestBody) => {
        if (body) {
          this.postOverviewService
            .editPost(post.blog.id, body)
            .pipe(untilDestroyed(this))
            .subscribe(
              (editedPost: Post) =>
                (this.post$ = this.postOverviewService.getPostById(
                  post.id,
                  post.blog.id
                ))
            );
        }
      });
  }
}
