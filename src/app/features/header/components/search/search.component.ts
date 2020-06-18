import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @Input() blogId: string;
  @Output() searchPosts = new EventEmitter<string>();
  searchInput: FormControl;

  ngOnInit(): void {
    this.searchInput = new FormControl('');
  }

  onSearch(): void {
    this.searchPosts.emit(this.searchInput.value);
    this.searchInput.setValue('');
  }

}
