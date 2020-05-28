import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Blog } from 'src/app/models/blogs.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() blogs: Blog[];
  @Output() blogChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

}
