import { Injectable } from '@angular/core';
import { ApiWebService } from 'src/app/api/api.web.service';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Injectable({ providedIn: 'root'})
export class PostOverviewService {

    constructor(private api: ApiWebService, private errorService: ErrorHandlerService) {}

    getPosts(id: string): Observable<Post[]> {
        return this.api.getPostsByBlog(id).pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }

    searchPosts(id: string, query: string): Observable<Post[]> {
        return this.api.searchPostsForBlog(id, query).pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }
}
