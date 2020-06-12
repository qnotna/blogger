import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailviewComponent } from './post-detailview.component';

describe('PostDetailviewComponent', () => {
  let component: PostDetailviewComponent;
  let fixture: ComponentFixture<PostDetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
