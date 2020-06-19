import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
  Input,
} from "@angular/core";
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

  constructor(
    private currentRoute: ActivatedRoute,
    private service: PostOverviewService
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      this.post$ = this.service.getPostById(params.postId, params.blogId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  onDelete(): void {
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      this.service
        .removePostFrom(params.blogId, params.postId)
        .subscribe((_) =>
          this.service.navigateTo(`/home/blogs/${params.blogId}`)
        );
    });
  }

  onEdit(post: Post): void {
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      const dialogRef = this.service.openDialog(post);
      this.dialogSub = dialogRef
        .afterClosed()
        .subscribe((body: PostRequestBody) => {
          if (body) {
            this.editPostSub = this.service
              .editPost(params.blogId, body)
              .subscribe(
                (editedPost: Post) => this.ngOnInit()
                /* this.service.navigateTo(
                  `/home/blogs/${params.blogId}/posts/${params.postId}/detail`
                ) */
              );
          }
        });
    });
  }
}
