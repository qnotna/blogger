import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { EditorConfig } from './my-dialog.config';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})

export class MyDialogComponent implements OnInit {
  Editor = ClassicEditor;
  Config = EditorConfig;
  title = new FormControl('', Validators.required);
  content = new FormControl('', Validators.required);

  constructor(
    public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

  onSave() {
    const body = {
      title: this.title.value,
      content: this.content.value,
    };
    console.log(body);
    this.dialogRef.close(body);
  }
  onCancel() {
    this.dialogRef.close();
  }
}
