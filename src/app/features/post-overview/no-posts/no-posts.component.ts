import { Component, OnInit } from '@angular/core';
import { PostOverviewService } from '../services/post-overview.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-no-posts',
  templateUrl: './no-posts.component.html',
  styleUrls: ['./no-posts.component.scss']
})
export class NoPostsComponent implements OnInit {
  noContent$: BehaviorSubject<boolean>;
  noResults$: BehaviorSubject<boolean>;
  isLoading$: BehaviorSubject<boolean>;

  imageUrl: string;
  title: string;
  message: string;

  constructor(
    private service: PostOverviewService
  ) { }

  ngOnInit(): void {
    this.noContent$ = this.service.noContent$;
    this.noResults$ = this.service.noResults$;
    this.isLoading$ = this.service.isLoading$;

    if (this.noResults$.getValue() === true) {
      this.imageUrl = 'https://img.icons8.com/color/96/000000/search.png';
      this.title = 'Nothing matching your search was found in this blog';
      this.message = 'Did you type in your query correctly?';
    }
    if (this.noContent$.getValue() === true) {
      this.imageUrl = 'https://img.icons8.com/fluent/96/000000/typewriter-with-paper.png';
      this.title = 'This blog does not contain any posts';
      this.message = 'Create a post in this blog to make it appear here.';
    }
  }
}
