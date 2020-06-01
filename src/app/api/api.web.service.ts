import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { GETBlogsResponse, Blog } from "../models/blogs.model";
import { Observable, throwError } from "rxjs";
import { GETPostsResponse, Post } from "../models/posts.model";
import { map, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class ApiWebService {
  API_KEY = "AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI";
  basePath = "https://www.googleapis.com";
  headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router
  ) {}

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
    this.headers = this.headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );
    const options = { headers: this.headers };
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

  createPostForBlog(blogId: number, requestBody: any) {
    const options = { headers: this.getHeaders() };
    // let body = requestBody;
    const body = {
      kind: "blogger#post",
      blog: {
        id: "8070105920543249955",
      },
      title: "Post",
      content: "With <b>exciting</b> content...",
    };
    return this.http
      .post(`${this.basePath}/blogger/v3/blogs/${blogId}/posts`, body, options)
      .pipe(catchError((err) => this.handleError(err)));
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
