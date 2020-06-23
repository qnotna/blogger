import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { renderNoPostsConfig, NoPostsConfig } from './no-posts.config';

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
  styleUrls: ['./no-posts.component.scss'],
})
export class NoPostsComponent implements OnChanges {
  @Input() noContent: boolean;
  @Input() noResults: boolean;
  @Input() onSearchPage: boolean;
  @Output() notifyParent = new EventEmitter<void>();
  config: NoPostsConfig;

  ngOnChanges(changes: SimpleChanges) {
    this.config = renderNoPostsConfig(this.noContent, this.noResults);
  }
}
