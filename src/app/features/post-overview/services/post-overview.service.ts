import { Injectable } from '@angular/core';
import { ApiWebService } from 'src/app/api/api.web.service';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PostRequestBody } from 'src/app/models/post-request-body.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class PostOverviewService {
    isLoading$ = new BehaviorSubject<boolean>(true);

    constructor(private api: ApiWebService, private errorService: ErrorHandlerService) {}

    getPosts(id: string): Observable<Post[]> {
        this.isLoading$.next(true);
        return this.api.getPostsByBlog(id).pipe(
            catchError(err => this.errorService.handleError(err)),
            finalize(() => this.isLoading$.next(false))
        );
    }

    searchPosts(id: string, query: string): Observable<Post[]> {
        this.isLoading$.next(true);
        return this.api.searchPostsForBlog(id, query).pipe(
            catchError(err => this.errorService.handleError(err)),
            finalize(() => this.isLoading$.next(false))
        );
    }

    createPost(blogId: string, body: PostRequestBody): Observable<Post> {
        return this.api.createPostForBlog(blogId, body).pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }

    removePostFrom(blogId: string, postId: string): any {
      return this.api.removePostFromBlogWithIds(blogId, postId).pipe(
        catchError((error) => (this.errorService.handleError(error)))
      );
    }
}
