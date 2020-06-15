import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNoneComponent } from './no-posts.component';

describe('PostNoneComponent', () => {
  let component: PostNoneComponent;
  let fixture: ComponentFixture<PostNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
