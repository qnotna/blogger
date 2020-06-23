import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() blogs: Blog[];
  @Input() blog: Blog;
  @Input() noBlogs: boolean;
  @Output() blogChanged = new EventEmitter<string>();
  @Output() searchPosts = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();
}
