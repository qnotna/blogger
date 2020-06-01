import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { GETBlogsResponse, Blog } from "../models/blogs.model";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GETPostsResponse, Post } from "../models/posts.model";

@Injectable({ providedIn: "root" })
export class ApiWebService {
  API_KEY = "AIzaSyD0YDZhEmlsFZ62Z8BwEcWakH4oX--W0nI";
  basePath = "https://www.googleapis.com";

  blogId = 3785371635900908274;

  headers: HttpHeaders = new HttpHeaders();

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBlogsByUser(): Observable<Blog[]> {
    this.headers = this.headers.set(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );
    const options = { headers: this.headers };
    return this.http
      .get<any>(`${this.basePath}/blogger/v3/users/self/blogs`, options)
      .pipe(
        map((res) => res as GETBlogsResponse),
        map((res) => res.items)
      );
  }

  getGetPostsByBlog(blogId: string) {
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
    this.headers.append(
      "Authorization",
      `Bearer ${this.authService.getToken()}`
    );
    const options = { headers: this.headers };
    // let body = requestBody;
    const body = {
      kind: "blogger#post",
      blog: {
        id: "8070105920543249955",
      },
      title: "Post",
      content: "With <b>exciting</b> content...",
    };
    return this.http.post(
      `${this.basePath}/blogger/v3/blogs/${blogId}/posts`,
      body,
      options
    );
  }
}
