import { Component, OnInit, Inject } from "@angular/core";
import { Post } from "../../../../models/posts.model";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";

@Component({
  selector: "app-post-detailview",
  templateUrl: "./post-detailview.component.html",
  styleUrls: ["./post-detailview.component.scss"],
})
export class PostDetailviewComponent implements OnInit {
  post$: Post;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.post$ = this.data.post;
  }
}
