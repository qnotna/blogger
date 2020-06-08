import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/posts.model';

@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html',
  styleUrls: ['./post-item.component.scss']
})
export class PostItemComponent {

  @Input() post: Post;
  @Output() showDetail = new EventEmitter<string>();

  @Output() notifyParent = new EventEmitter<{}>();
  /**
   * Emit remove event to parent
   * @param postId post identifier
   */
  deleteSelf() {
    this.notifyParent.emit({
      blogId: this.post.blog.id,
      postId: this.post.id
    });
  };

}
