import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from './post-dialog.config';
import { FormControl, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})

export class PostDialogComponent implements OnInit {
  Editor = ClassicEditor;
  Config = EditorConfig;
  title : FormControl;
  content : FormControl;
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    if(this.data.post){
      this.editMode = true;
      this.title = new FormControl(this.data.post.title, Validators.required);
      this.content = new FormControl(this.data.post.content, Validators.required);
    }
    else{
      this.editMode = false;
      this.title = new FormControl("", Validators.required);
      this.content = new FormControl("", Validators.required);
    }
  }

  onSave() {
    const body = {
      title: this.title.value,
      content: this.content.value,
      postId: this.data.post.id
    };
    this.dialogRef.close(body);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
