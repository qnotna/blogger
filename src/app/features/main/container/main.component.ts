import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { AuthService } from 'src/app/services/auth.service';
import { Post } from 'src/app/models/posts.model';
import { MainService } from '../services/main.service';
import { MyDialogComponent } from '../../my-dialog/my-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  blogs$: Observable<Blog[]>;
  posts$: Observable<Post[]>;
  blogId: string;
  dialogSub: Subscription;

  constructor(private service: MainService, private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit() {
    this.fetchBlogs();
  }

  fetchBlogs() {
    this.blogs$ = this.service.getBlogs();
  }

  onBlogChange(selectedBlogId: string) {
    this.blogId = selectedBlogId;
    this.service.handleBlogChange(selectedBlogId);
  }

  onSearchPost(query: string) {
    this.service.handleSearch(this.blogId, query);
  }

  onLogout() {
    this.authService.handleAuth();
  }

  onPostingPost(): void {
    const dialogRef = this.dialog.open(MyDialogComponent, {
      data: {
         blogId: this.blogId
      }
    });

    this.dialogSub = dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog Closed >', result);
      // API-call add post
    });
  }

  ngOnDestroy() {
    this.dialogSub.unsubscribe();
  }

}
