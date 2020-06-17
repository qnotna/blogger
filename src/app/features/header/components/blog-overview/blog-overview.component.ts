import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss']
})
export class BlogOverviewComponent {

  currentBlog: Blog;
  selectBlogs: Blog[];
  hasBlogs = false;

  @Output() blogChanged = new EventEmitter<string>();
  @Input() set blogs(blogs: Blog[]) {
    this.hasBlogs = false;
    if (blogs && blogs !== null) {
      this.hasBlogs = true;
      this.blogChanged.emit(blogs[0].id);
      this.currentBlog = blogs[0];
      this.selectBlogs = blogs;
    }
  }

  onBlogChange(): void {
    this.blogChanged.emit(this.currentBlog.id);
  }

}
