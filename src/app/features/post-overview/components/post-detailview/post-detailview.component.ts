import { Component, OnInit, OnDestroy } from "@angular/core";
import { Post } from "../../../../models/posts.model";
import { ActivatedRoute, Params } from "@angular/router";
import { PostOverviewService } from "../../services/post-overview.service";
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { PostRequestBody } from "src/app/models/post-request-body.model";

@Component({
  selector: "app-post-detailview",
  templateUrl: "./post-detailview.component.html",
  styleUrls: ["./post-detailview.component.scss"],
})
export class PostDetailviewComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  isLoading$: BehaviorSubject<boolean>;

  routeSub: Subscription;
  dialogSub: Subscription;
  editPostSub: Subscription;
  deleteSub: Subscription;

  constructor(
    private currentRoute: ActivatedRoute,
    private postOverviewService: PostOverviewService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.postOverviewService.isLoading$;
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      this.post$ = this.postOverviewService.getPostById(
        params.postId,
        params.blogId
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
    this.dialogSub?.unsubscribe();
    this.editPostSub?.unsubscribe();
    this.deleteSub?.unsubscribe();
  }

  onComment() {
    alert(`Don't touch this dude!`);
  }

  onDelete(post: Post): void {
    this.deleteSub = this.postOverviewService
      .removePostFrom(post.blog.id, post.id)
      .subscribe((_) =>
        this.postOverviewService.navigateTo(`/home/blogs/${post.blog.id}/posts`)
      );
  }

  onEdit(post: Post): void {
    const dialogRef = this.postOverviewService.openDialog(post);
    this.dialogSub = dialogRef
      .afterClosed()
      .subscribe((body: PostRequestBody) => {
        if (body) {
          this.editPostSub = this.postOverviewService
            .editPost(post.blog.id, body)
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
