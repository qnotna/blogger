import { Component, Input } from '@angular/core';
import { NoBlogsConfig } from './no-blogs.config';

@Component({
  selector: 'app-no-blogs',
  templateUrl: './no-blogs.component.html',
  styleUrls: ['./no-blogs.component.scss']
})
export class NoBlogsComponent {
  @Input() noBlogs: boolean;
  config = NoBlogsConfig;
}
