import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostItemComponent } from './post-item.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from 'src/app/models/posts.model';

const fakePost: Post = {
  kind: 'string',
  blog: {
    id: 'string',
  },
  updated: 'string',
  url: 'string',
  selflink: 'string',
  id: 'id',
  published: 'date',
  title: 'title',
  content: 'content',
  author: {
    id: 'id',
    displayName: 'name',
    url: 'url',
    image: {
      url: 'url',
    },
  },
  replies: {
    totalItems: 'string',
    selfLink: 'string',
  },
};

describe('PostItemComponent', () => {
  let component: PostItemComponent;
  let fixture: ComponentFixture<PostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostItemComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    component.post = fakePost;
    fixture = TestBed.createComponent(PostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
