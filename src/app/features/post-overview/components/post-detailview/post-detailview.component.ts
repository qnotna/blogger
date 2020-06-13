import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../../models/posts.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PostOverviewService } from '../../services/post-overview.service';
import { Observable, Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-post-detailview',
  templateUrl: './post-detailview.component.html',
  styleUrls: ['./post-detailview.component.scss'],
})
export class PostDetailviewComponent implements OnInit, OnDestroy {
  post$: Observable<Post>;
  routeSub: Subscription;
  isLoading$: BehaviorSubject<boolean>;

  constructor(private currentRoute: ActivatedRoute, private service: PostOverviewService) {}

  ngOnInit(): void {
    this.isLoading$ = this.service.isLoading$;
    this.routeSub = this.currentRoute.params.subscribe((params: Params) => {
      this.post$ = this.service.getPostById(params.postId, params.blogId);
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }
}
