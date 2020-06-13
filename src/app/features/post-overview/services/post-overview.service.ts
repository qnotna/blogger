import { Injectable } from "@angular/core";
import { ApiWebService } from "src/app/api/api.web.service";
import { Observable } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Post } from "src/app/models/posts.model";
import { ErrorHandlerService } from "src/app/services/error-handler.service";
import { PostRequestBody } from "src/app/models/post-request-body.model";
import { BehaviorSubject } from "rxjs";
import { Router } from '@angular/router';

@Injectable({ providedIn: "root" })
export class PostOverviewService {
  isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private api: ApiWebService,
    private router: Router,
    private errorService: ErrorHandlerService
  ) {}

  getPosts(id: string): Observable<Post[]> {
    this.isLoading$.next(true);
    return this.api.getPostsByBlog(id).pipe(
      catchError((err) => this.errorService.handleError(err)),
      finalize(() => this.isLoading$.next(false))
    );
  }

  getPostById(postId: string, blogId: string): Observable<Post> {
    this.isLoading$.next(true);
    return this.api.getPostById(blogId, postId).pipe(
      catchError((err) => this.errorService.handleError(err)),
      finalize(() => this.isLoading$.next(false))
    );
  }

  searchPosts(id: string, query: string): Observable<Post[]> {
    this.isLoading$.next(true);
    return this.api.searchPostsForBlog(id, query).pipe(
      catchError((err) => this.errorService.handleError(err)),
      finalize(() => this.isLoading$.next(false))
    );
  }

  createPost(blogId: string, body: PostRequestBody): Observable<Post> {
    return this.api
      .createPostForBlog(blogId, body)
      .pipe(catchError((err) => this.errorService.handleError(err)));
  }

  handleShowDetail(blogId: string, postId: string) {
    this.router.navigate([`home/blogs/${blogId}/posts/${postId}/detail`]);
  }
}
