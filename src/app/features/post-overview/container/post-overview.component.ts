import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../models/posts.model";
import { ApiWebService } from "src/app/api/api.web.service";

@Component({
  selector: "app-post-overview",
  templateUrl: "./post-overview.component.html",
  styleUrls: ["./post-overview.component.scss"],
})
export class PostOverviewComponent implements OnInit {
  postList$: Observable<Post[]>;
  blogId: string = "6797403791528154506";
  postList: Post[];

  constructor(private api: ApiWebService) {}

  ngOnInit(): void {
    this.postList$ = this.api.getGetPostsByBlog(this.blogId);
    console.log(this.postList$);
  }
}
