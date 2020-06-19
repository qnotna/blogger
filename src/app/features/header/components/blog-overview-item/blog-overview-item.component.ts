import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-overview-item',
  templateUrl: './blog-overview-item.component.html',
  styleUrls: ['./blog-overview-item.component.scss']
})
export class BlogOverviewItemComponent {
  @Input() blogName: string;
  @Input() blogUpdated: string;
}
