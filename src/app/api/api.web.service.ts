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
  private API_KEY = 'AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI';
  private basePath = 'https://www.googleapis.com';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  getBlogsByUser(): Observable<Blog[]> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(`${this.basePath}/blogger/v3/users/self/blogs`, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(res => res as GETBlogsResponse),
        map(res => res.items),
      );
  }

  getBlogById(blogId: string): Observable<Blog> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(`${this.basePath}/blogger/v3/blogs/${blogId}`, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(res => res as Blog),
      );
  }

  getPostsByBlog(blogId: string): Observable<Post[]> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(`${this.basePath}/blogger/v3/blogs/${blogId}/posts?key=${this.API_KEY}`, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(res => res as GETPostsResponse),
        map(res => res.items),
      );
  }

  getPostById(blogId: string, postId: string): Observable<Post> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get<any>(
        `${this.basePath}/blogger/v3/blogs/${blogId}/posts/${postId}?key=${this.API_KEY}`,
        options,
      )
      .pipe(
        catchError(err => this.handleError(err)),
        map(res => res as Post),
      );
  }

  createPostForBlog(blogId: string, requestBody: PostRequestBody): Observable<Post> {
    const options = { headers: this.getHeaders() };
    const body = requestBody;
    return this.http
      .post(`${this.basePath}/blogger/v3/blogs/${blogId}/posts`, body, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(createdPost => createdPost as Post),
      );
  }

  searchPostsForBlog(blogId: string, q: string): Observable<Post[]> {
    const options = { headers: this.getHeaders() };
    return this.http
      .get(`${this.basePath}/blogger/v3/blogs/${blogId}/posts/search?q=${q}`, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(res => res as GETPostsResponse),
        map(res => res.items),
      );
  }

  editPostForBlog(blogId: string, requestBody: PostRequestBody): Observable<Post> {
    const options = { headers: this.getHeaders() };
    const body = requestBody;
    return this.http
      .patch(`${this.basePath}/blogger/v3/blogs/${blogId}/posts/${body.postId}`, body, options)
      .pipe(
        catchError(err => this.handleError(err)),
        map(editedPost => editedPost as Post),
      );
  }

  /**
   * Removes a specified post from the corresponding blog
   * @param blogId id to identify the post's blog
   * @param postId id to identify the post
   */
  removePostFromBlogWithIds(blogId: string, postId: string): Observable<any> {
    const url = `${this.basePath}/blogger/v3/blogs/${blogId}/posts/${postId}?key=${this.API_KEY}`;
    const options = { headers: this.getHeaders() };
    return this.http.delete(url, options).pipe(
      catchError(err => this.handleError(err)),
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorObj = error.error.error;
    return throwError(errorObj);
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
  }
}
