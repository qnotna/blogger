import { Component, OnInit } from "@angular/core";
import { Post } from "../../../../models/posts.model";
import { ActivatedRoute, Params } from '@angular/router';
import { PostOverviewService } from '../../services/post-overview.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-post-detailview",
  templateUrl: "./post-detailview.component.html",
  styleUrls: ["./post-detailview.component.scss"],
})
export class PostDetailviewComponent implements OnInit {
  post$: Observable<Post>;
  
  constructor(private currentRoute: ActivatedRoute, private service: PostOverviewService) {}

  ngOnInit(): void {
    this.currentRoute.params.subscribe((params: Params) => {
      this.post$ = this.service.getPostById(params.postId, params.blogId);
    });
  }
}
