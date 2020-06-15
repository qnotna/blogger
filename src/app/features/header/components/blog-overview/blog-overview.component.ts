import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogOverviewComponent implements OnChanges {

  currentBlog: string;
  selectBlogs: Blog[];
  hasBlogs = false;

  @Input() set blogs(blogs: Blog[]) {
    this.hasBlogs = false;
    if (blogs && blogs !== null) {
      this.hasBlogs = true;
      this.currentBlog = blogs[0].id;
      this.selectBlogs = blogs;
    }
  }
  @Output() blogChanged = new EventEmitter<string>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blogs.currentValue) {
      this.blogChanged.emit(changes.blogs.currentValue[0]?.id);
    }
  }

  onBlogChange(event: MatSelectChange): void {
    this.blogChanged.emit(this.currentBlog);
  }

  get getBlogs(): Blog[] {
    return this.selectBlogs;
  }

}
