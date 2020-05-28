import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogOverviewComponent {

  @Input() blogs: Blog[];
  @Output() blogChanged = new EventEmitter<string>();

  constructor() { }

  onBlogChange(event: Event) {
    this.blogChanged.emit((event.target as HTMLSelectElement).value);
  }

}
