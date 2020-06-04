import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
<<<<<<< HEAD
=======
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
<<<<<<< HEAD
  styleUrls: ['./my-dialog.component.scss']
=======
  styleUrls: ['./my-dialog.component.scss'],
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
})
export class MyDialogComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogs: Blog[];
<<<<<<< HEAD
  @ViewChild("content", { static: true }) content;
  @ViewChild("title", { static: true }) title;

=======
 @ViewChild("content",{static: true}) content;
 @ViewChild("title" , {static: true}) title;
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed

  constructor(private api: ApiWebService, public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.blogId)
<<<<<<< HEAD
  }
=======
  } 
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed

  onSave() {
    let body = {
      title: this.title.nativeElement.value,
      content: this.content.nativeElement.value,
      timestamp: new Date()
    };
    console.log(body)
<<<<<<< HEAD
    this.api.createPostForBlog(this.data.blogId, body).subscribe((response) => {
      console.log(response)
    })

    this.dialogRef.close();
  }
  onCancel() {
=======
    this.api.createPostForBlog(this.data.blogId, body).subscribe((response) =>{
      console.log(response)
    })
    
    this.dialogRef.close();
  }
  onCancel(){
>>>>>>> 1cecc69a2bed133983972665679a1aff7027c2ed
    this.dialogRef.close();
  }


}
