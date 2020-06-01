import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  @Input() blogId: string;
  @Output() searchPosts = new EventEmitter<string>();

  constructor() {}

  onEnter(value: string) {
    this.searchPosts.emit(value);
  }

}
