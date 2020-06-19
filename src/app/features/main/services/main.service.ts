import { Injectable } from '@angular/core';
import { ApiWebService } from 'src/app/api/api.web.service';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { catchError, filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Injectable({ providedIn: 'root'})
export class MainService {
    constructor(private api: ApiWebService, private router: Router, private errorService: ErrorHandlerService) {}

    /**
     * GET - Retrieves and returns Blogs wrapped in Observable
     */
    getBlogs(): Observable<Blog[]> {
        return this.api.getBlogsByUser().pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }

    /**
     * GET - Retrieves and returns Blog wrapped in Observable
     * @param blogId blog id
     */
    getBlogById(blogId: string): Observable<Blog> {
        return this.api.getBlogById(blogId).pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }

    /**
     * Routes to post overview
     * @param blogId blog id
     */
    handleBlogChange(blogId: string): void {
        this.router.navigate([`home/blogs/${blogId}/posts`]);
    }

    /**
     * Routes to post overview displaying either posts or search results depending on passed query
     * @param blogId blog id
     * @param query search term
     */
    handleSearch(blogId: string, query: string): void {
        if (query !== '') {
            this.router.navigate([`home/blogs/${blogId}/posts/search`], { queryParams: { q: query } });
        }
        if (query === '' && this.router.url.includes('q=')) {
            this.router.navigate([`home/blogs/${blogId}/posts`]);
        }
    }

    getRouteChange(): Observable<Event> {
        return this.router.events
            .pipe(filter(event => event instanceof NavigationEnd));
    }
}
