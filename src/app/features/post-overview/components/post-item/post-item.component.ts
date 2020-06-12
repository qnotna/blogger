import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { MatDialog } from '@angular/material/dialog';
import { PostDialogComponent } from '../post-dialog/post-dialog.component';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input() post: Post;
  @Output() showDetail = new EventEmitter<string>();

  constructor(
    private dialog: MatDialog,
  ) {}

  openEdit(){
    this.dialog.open(PostDialogComponent);
  }

}
