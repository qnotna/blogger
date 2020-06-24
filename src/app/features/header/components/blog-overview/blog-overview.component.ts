import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';
import { FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
})
export class BlogOverviewComponent implements OnInit {

  currentBlog: Blog;
  selectBlogs: Blog[];
  matSelect: FormControl;

  @Input() noBlogs: boolean;

  /**
   * updates selected blog based on id in given selectBlogs, when navigating between blogs
   */
  @Input() set blog(blog: Blog) {
    if (blog !== null) {
      this.currentBlog = blog;
      const toSelect = this.selectBlogs.find((b: Blog) => b.id === blog.id);
      this.matSelect.patchValue(toSelect);
    }
  }

  /**
   * emits first blog in retrieved blogs to trigger onBlogChange() in main.component,
   * routing to post-overview.component
   */
  @Input() set blogs(blogs: Blog[]) {
    if (blogs !== null && blogs !== undefined) {
      this.blogChanged.emit(blogs[0]?.id);
      this.selectBlogs = blogs;
    }
  }

  @Output() blogChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.matSelect = new FormControl('');
  }

  onBlogChange(event: MatSelectChange): void {
    this.currentBlog = event.value as Blog;
    this.blogChanged.emit(this.currentBlog.id);
  }

  get loadedBlogs() {
    return this.selectBlogs && this.currentBlog;
  }

}
