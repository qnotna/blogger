import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/posts.model';
import { DeleteRequestBody } from 'src/app/models/post-request-body.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {
  @Input() post: Post;
  @Output() showDetail = new EventEmitter<string>();
  @Output() openEdit = new EventEmitter<Post>();
  @Output() deletePost = new EventEmitter<DeleteRequestBody>();

  /**
   * Emit remove event to parent
   * @param postId post identifier
   */
  onDelete(): void {
    this.deletePost.emit({
      blogId: this.post.blog.id,
      postId: this.post.id
    } as DeleteRequestBody);
  }

  /**
   * parses html content and searches for img-tags, accessing and returning src attribute if no img is found a placeholder will be returned
   * @param content string used to create a HTML Element in order to access html tags within
   */
  getFirstImgFromContent(content: string): string {
    const div: HTMLElement = document.createElement('div');
    div.innerHTML = content;
    const images: HTMLCollection = div.getElementsByTagName('img');
    return images[0] ? (images[0] as HTMLImageElement).src : '../../.././../../assets/img/placeholder.gif';
  }

}
