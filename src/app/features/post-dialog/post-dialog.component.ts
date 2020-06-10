import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from './post-dialog.config';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-dialog',
  templateUrl: './post-dialog.component.html',
  styleUrls: ['./post-dialog.component.scss']
})

export class PostDialogComponent implements OnInit {
  Editor = ClassicEditor;
  Config = EditorConfig;
  title = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<PostDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onSave() {
    const body = {
      title: this.title.value,
      content: this.content.value,
    };
    this.dialogRef.close(body);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
