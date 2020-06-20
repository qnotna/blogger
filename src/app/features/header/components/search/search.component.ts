import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {

  @ViewChild('input', {static: true}) input: ElementRef;
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

  onFocus(): void {
    (this.input.nativeElement as HTMLInputElement).focus();
  }

}
