import { Component, Output, EventEmitter, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-blog-overview',
  templateUrl: './blog-overview.component.html',
  styleUrls: ['./blog-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogOverviewComponent implements OnChanges {

  @Input() blogs: Blog[];
  @Output() blogChanged = new EventEmitter<string>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.blogs && this.blogs) {
      this.blogChanged.emit(changes?.blogs?.currentValue[0]?.id);
    }
  }

  onBlogChange(event: Event) {
    this.blogChanged.emit((event.target as HTMLSelectElement).value);
  }

}
