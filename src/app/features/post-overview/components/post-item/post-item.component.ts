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

  onComment() {
    alert(`Don't touch this dude!`);
  }

}
