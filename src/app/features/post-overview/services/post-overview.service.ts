import { Injectable } from '@angular/core';
import { ApiWebService } from 'src/app/api/api.web.service';
import { Observable } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { Post } from 'src/app/models/posts.model';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { PostRequestBody } from 'src/app/models/post-request-body.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialogConfig, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostDialogComponent } from '../components/post-dialog/post-dialog.component';
import { DialogData } from 'src/app/models/dialog-data.model';

@Injectable({ providedIn: 'root' })
export class PostOverviewService {
  isLoading$ = new BehaviorSubject<boolean>(true);
  noContent$ = new BehaviorSubject<boolean>(false);
  noResults$ = new BehaviorSubject<boolean>(false);
  onSearchPage$ = new BehaviorSubject<boolean>(false);

  constructor(
    private api: ApiWebService,
    private router: Router,
    private errorService: ErrorHandlerService,
    private dialog: MatDialog,
  ) {}

  /**
   * GET - Retrieves and returns posts from blog, passed by id wrapped in Observable
   * @param blogId blog id
   */
  getPosts(blogId: string): Observable<Post[]> {
    this.isLoading$.next(true);
    return this.api.getPostsByBlog(blogId)
      .pipe(
        catchError((err) => this.errorService.handleError(err)),
        map((posts: Post[]) => {
          if (!posts) {
            this.noContent$.next(true);
            return [];
          }
          this.onSearchPage$.next(false);
          this.noContent$.next(false);
          return posts;
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  /**
   * GET - Retrieves and return specific Post from specific Blog wrapped  in Observable
   * @param postId post id to retrieve specific post
   * @param blogId blog id
   */
  getPostById(postId: string, blogId: string): Observable<Post> {
    this.isLoading$.next(true);
    return this.api.getPostById(blogId, postId)
      .pipe(
        catchError((err) => this.errorService.handleError(err)),
        finalize(() => this.isLoading$.next(false))
      );
  }

  /**
   * GET - Retrieves and returns a collection of Posts wrapped in Observable
   * @param blogId blog id
   * @param query search term passed as q (query) in api call
   */
  searchPosts(blogId: string, query: string): Observable<Post[]> {
    this.isLoading$.next(true);
    return this.api.searchPostsForBlog(blogId, query)
      .pipe(
        catchError((err) => this.errorService.handleError(err)),
        map((posts: Post[]) => {
          if (!posts) {
            this.noResults$.next(true);
            return [];
          }
          this.onSearchPage$.next(true);
          this.noResults$.next(false);
          return posts;
        }),
        finalize(() => this.isLoading$.next(false))
      );
  }

  /**
   * POST - Creates Post for specific Blog, returns created Post wrapped in Observable
   * @param blogId blog id for blog for which the post will be created
   * @param body body of type PostRequestBody contains title and content to be passed as request body to api call
   */
  createPost(blogId: string, body: PostRequestBody): Observable<Post> {
    this.isLoading$.next(true);
    return this.api.createPostForBlog(blogId, body)
      .pipe(
        catchError((err) => this.errorService.handleError(err)),
        finalize(() => this.isLoading$.next(false))
      );
  }

  /**
   * PATCH - Updates Post with passed body and returns updated Post wrapped in Observable
   * @param blogId blog id
   * @param postId post id
   * @param body updated body for affected Post, specified by post id and blog id
   */
  editPost(blogId: string, body: PostRequestBody): Observable<Post> {
    this.isLoading$.next(true);
    return this.api.editPostForBlog(blogId, body)
      .pipe(
          catchError(err => this.errorService.handleError(err)),
          finalize(() => this.isLoading$.next(false))
      );
  }

  /**
   * DELETE - Deletes specific Post from specific Blog
   * @param blogId blog id
   * @param postId post id
   */
  removePostFrom(blogId: string, postId: string): Observable<any> {
    return this.api.removePostFromBlogWithIds(blogId, postId)
      .pipe(
        catchError((error) => (this.errorService.handleError(error)))
      );
  }

  /**
   * Navigates to /detail containing PostDetailvewComponent
   * @param blogId blog id - used as route param
   * @param postId post id - used as route param
   */
  handleShowDetail(blogId: string, postId: string): void {
    this.router.navigate([`home/blogs/${blogId}/posts/${postId}/detail`]);
  }

  /**
   * Opens up MatDialog and returns MatDialogRef
   * @param prop blogId or post passed in data to be accessible in PostDialogCompoent
   */
  openDialog(prop: string | Post): MatDialogRef<PostDialogComponent> {
    const dialogConfig: MatDialogConfig = {
      data: this.renderData(prop)
    };
    return this.dialog.open(PostDialogComponent, dialogConfig);
  }

  renderData(prop: any): DialogData {
    const dialogData: DialogData = (typeof(prop) === 'object') ? { post: prop } : { blogId: prop };
    return dialogData;
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }

}
