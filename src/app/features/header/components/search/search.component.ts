import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent {

  @Input() blogId: string;
  @Output() searchPosts = new EventEmitter<string>();

  constructor() {}

  onSearch(value: string) {
    this.searchPosts.emit(value);
  }

}
