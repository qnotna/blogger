import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @Input() blogs: Blog[];
  @Output() blogChanged = new EventEmitter<string>();
  @Output() logout = new EventEmitter<void>();

  constructor() { }

  onLogout() {
    this.logout.emit();
  }
}
