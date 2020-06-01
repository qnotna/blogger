import { Component, OnInit, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../../models/posts.model";
import { ApiWebService } from "src/app/api/api.web.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-post-overview",
  templateUrl: "./post-overview.component.html",
  styleUrls: ["./post-overview.component.scss"],
})
export class PostOverviewComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(
    private api: ApiWebService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.posts$ = this.api.getPostsByBlog(params.blogId);
    });
  }
}
