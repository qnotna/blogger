import { Component, OnInit, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';


@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MyDialogComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogs: Blog[];
  @ViewChild("content", { static: true }) content;
  @ViewChild("title", { static: true }) title;
  @ViewChild("image", { static: true }) image;

  constructor(private api: ApiWebService, public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.blogId)
  }

  onSave() {
    let body;
    if (this.image.nativeElement.value == null) {
      body = {
        title: this.title.nativeElement.value,
        content: this.content.nativeElement.value,
        timestamp: new Date()
      };
    } else {
      body = {
        title: this.title.nativeElement.value,
        content: this.content.nativeElement.value + ` <img src=\"${this.image.nativeElement.value}\"/>`,
        timestamp: new Date()
      };
    }
    console.log(body)
    this.api.createPostForBlog(this.data.blogId, body).subscribe((response) => {
       console.log(response)
     })
    this.dialogRef.close();
  }
  onCancel() {
    this.dialogRef.close();
  }
  addBold(){
    this.content.nativeElement.value =  this.content.nativeElement.value + "<b></b>"
  }
  addEmphasis(){
    this.content.nativeElement.value =  this.content.nativeElement.value + "<i></i>"
  }
  addStrike(){
    this.content.nativeElement.value =  this.content.nativeElement.value + "<s></s>"
  }
  addUnderline(){
    this.content.nativeElement.value =  this.content.nativeElement.value + "<u></u>"
  }
}
