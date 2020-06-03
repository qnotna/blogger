import { Injectable } from '@angular/core';
import { ApiWebService } from 'src/app/api/api.web.service';
import { Observable } from 'rxjs';
import { Blog } from 'src/app/models/blogs.model';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';

@Injectable({ providedIn: 'root'})
export class MainService {
    constructor(private api: ApiWebService, private router: Router, private errorService: ErrorHandlerService) {}

    getBlogs(): Observable<Blog[]> {
        return this.api.getBlogsByUser().pipe(
            catchError(err => this.errorService.handleError(err))
        );
    }

    handleError(err: any) {
        if (err?.code === 401) {
            this.router.navigate(['/login']);
        }
        return [];
    }

    handleBlogChange(id: string) {
        this.router.navigate([`home/blogs/${id}/posts`]);
    }

    handleSearch(id: string, query: string) {
        if (query !== '') {
            this.router.navigate([`home/blogs/${id}/posts/search`], { queryParams: { q: query } });
        }
        if (query === '' && this.router.url.includes('q=')) {
            this.router.navigate([`home/blogs/${id}/posts`]);
        }
    }
}
