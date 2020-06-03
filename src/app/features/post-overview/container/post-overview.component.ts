import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, combineLatest, Subscription } from 'rxjs';
import { Post } from '../../../models/posts.model';
import { ApiWebService } from 'src/app/api/api.web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-overview',
  templateUrl: './post-overview.component.html',
  styleUrls: ['./post-overview.component.scss'],
})
export class PostOverviewComponent implements OnInit, OnDestroy {
  posts$: Observable<Post[]>;
  postSub: Subscription;

  constructor(
    private api: ApiWebService,
    private currentRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Combine 2 Observables into 1 in order to check and make api call based on current url
    this.postSub = combineLatest([
      this.currentRoute.params,
      this.currentRoute.queryParams
    ])
    .subscribe(([params, query]) => {
      if (query.q !== undefined) {
        this.posts$ = this.api.searchPostsForBlog(params.blogId, query.q);
      } else {
        this.posts$ = this.api.getPostsByBlog(params.blogId);
      }
    });
  }

  onShowDetail(postId: string) {
    console.log('PostOverviewComponent > Clicked Post with id:', postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
