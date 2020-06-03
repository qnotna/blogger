import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-dialog',
  templateUrl: './my-dialog.component.html',
  styleUrls: ['./my-dialog.component.scss']
})
export class MyDialogComponent implements OnInit {
  blogs$: Observable<Blog[]>;
  blogs: Blog[];

  constructor(private api: ApiWebService, public dialogRef: MatDialogRef<MyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  } 

  onSave() {
    this.api.createPostForBlog(1169685908644477909, null)
    this.dialogRef.close();
  }
  onCancel(){
    this.dialogRef.close();
  }


}
