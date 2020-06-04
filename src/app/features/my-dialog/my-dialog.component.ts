import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss'],
})
export class MyDialogComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogs: Blog[];
 @ViewChild("content",{static: true}) content;
 @ViewChild("title" , {static: true}) title;

  constructor(private api: ApiWebService, public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.blogId)
  } 

  onSave() {
    let body = {
      title: this.title.nativeElement.value,
      content: this.content.nativeElement.value,
      timestamp: new Date()
    };
    console.log(body)
    this.api.createPostForBlog(this.data.blogId, body).subscribe((response) =>{
      console.log(response)
    })
    
    this.dialogRef.close();
  }
  onCancel(){
    this.dialogRef.close();
  }


}
