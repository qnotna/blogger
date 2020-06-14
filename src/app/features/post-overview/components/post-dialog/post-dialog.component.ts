import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from './post-dialog.config';
import { FormControl, Validators } from '@angular/forms';
import { PostRequestBody } from 'src/app/models/post-request-body.model';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})

export class PostDialogComponent implements OnInit {
  Editor = ClassicEditor;
  Config = EditorConfig;
  title: FormControl;
  content: FormControl;
  editMode = false;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.title = new FormControl('', Validators.required);
    this.content = new FormControl('', Validators.required);
    if (this.data.post) {
      this.editMode = true;
      this.title = new FormControl(this.data.post.title, Validators.required);
      this.content = new FormControl(this.data.post.content, Validators.required);
    }
  }

  onSave() {
    const body: PostRequestBody = {
      title: this.title.value,
      content: this.content.value,
    };
    if (this.editMode) {
      body.postId = this.data.post.id;
    }
    this.dialogRef.close(body);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
