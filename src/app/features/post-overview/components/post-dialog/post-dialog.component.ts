import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { editorConfig, emptyPost } from './post-dialog.config';
import { FormControl } from '@angular/forms';
import { PostRequestBody } from 'src/app/models/post-request-body.model';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss'],
})

export class PostDialogComponent implements OnInit {
  editor = ClassicEditor;
  config = editorConfig;
  title: FormControl;
  content: FormControl;
  private emptyPost = emptyPost;
  private editMode = false;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.title = new FormControl('');
    this.content = new FormControl('');
    if (this.data.post) {
      this.editMode = true;
      this.title = new FormControl(this.data.post.title);
      this.content = new FormControl(this.data.post.content);
    }
  }

  onSave(): void {
    const body: PostRequestBody = {
      title: this.title.value ? this.title.value : this.emptyPost.title,
      content: this.content.value ? this.content.value : this.emptyPost.content,
    };
    if (this.editMode) {
      body.postId = this.data.post.id;
    }
    this.dialogRef.close(body);
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
