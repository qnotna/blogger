import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { GETBlogsResponse, Blog } from '../models/blogs.model';
import { Observable, throwError } from 'rxjs';
import { GETPostsResponse, Post } from '../models/posts.model';
import { map, catchError } from 'rxjs/operators';
import { PostRequestBody } from '../models/post-request-body.model';

@Injectable({ providedIn: 'root' })
export class ApiWebService {
  API_KEY = 'AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI';
  basePath = 'https://www.googleapis.com';
  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getBlogsByUser(): Observable<Blog[]> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(`${this.basePath}/blogger/v3/users/self/blogs`, options)
      .pipe(
        catchError((err) => this.handleError(err)),
        map((res) => res as GETBlogsResponse),
        map((res) => res.items)
      );
  }

  getPostsByBlog(blogId: string): Observable<Post[]> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(
        `${this.basePath}/blogger/v3/blogs/${blogId}/posts?key=${this.API_KEY}`,
        options
      )
      .pipe(
        map((res) => res as GETPostsResponse),
        map((res) => res.items)
      );
  }

  createPostForBlog(blogId: string, requestBody: PostRequestBody) {
    const options = { headers: this.getHeaders() };
    const body = requestBody;
    return this.http
      .post(`${this.basePath}/blogger/v3/blogs/${blogId}/posts`, body, options)
      .pipe(catchError((err) => this.handleError(err)));
  }

  searchPostsForBlog(blogId: string, q: string) {
    const options = { headers: this.getHeaders() };
    return this.http.get(`${this.basePath}/blogger/v3/blogs/${blogId}/posts/search?q=${q}`, options).pipe(
      catchError((err) => this.handleError(err)),
      map((res) => res as GETPostsResponse),
      map((res) => res.items)
    );
  }

  /**
   * Removes a specified post from the corresponding blog
   * @param blogId id to identify the post's blog
   * @param postId id to identify the post
   */
  removePostFromBlogWithIds(blogId: string, postId: string): any {
    const url = `${this.basePath}/blogger/v3/blogs/${blogId}/posts/${postId}?key=${this.API_KEY}`;
    const options = {
      headers: this.getHeaders()
    };
    return this.http.delete(url, options).pipe(
      catchError((err) => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    const errorObj = error.error.error;
    return throwError(errorObj);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }
}
