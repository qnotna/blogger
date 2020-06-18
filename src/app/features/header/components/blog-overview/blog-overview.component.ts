import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss']
})
export class BlogOverviewComponent implements OnInit {

  form: FormGroup;
  currentBlog: Blog;
  selectBlogs: Blog[];

  @Input() set blog(blog: Blog) {
    if (blog !== null) {
      this.currentBlog = blog;
      // this.form.get('matSelect').setValue(blog)
    }
  }

  @Input() set blogs(blogs: Blog[]) {
    if (blogs !== null) {
      this.blogChanged.emit(blogs[0].id);
      this.selectBlogs = blogs;
    }
  }

  @Output() blogChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.form = new FormGroup({
      matSelect: new FormControl()
    });
  }

  onBlogChange(event: MatSelectChange): void {
    this.currentBlog = event.value as Blog;
    this.blogChanged.emit(this.currentBlog.id);
  }

  get loadedBlogs() {
    return this.selectBlogs && this.currentBlog;
  }

  // @Input() blog: Blog;

  // currentBlog: Blog;
  // selectBlogs: Blog[];
  // hasBlogs = false;

  // @Output() blogChanged = new EventEmitter<string>();
  // @Input() set blogs(blogs: Blog[]) {
  //   this.hasBlogs = false;
  //   if (blogs && blogs !== null) {
  //     this.hasBlogs = true;
  //     this.blogChanged.emit(blogs[0].id);
  //     this.currentBlog = blogs[0];
  //     this.selectBlogs = blogs;
  //   }
  // }

  // onBlogChange(): void {
  //   this.blogChanged.emit(this.currentBlog.id);
  // }

}
