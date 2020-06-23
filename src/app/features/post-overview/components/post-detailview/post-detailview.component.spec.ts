import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailviewComponent } from './post-detailview.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mockRoute } from 'src/app/testing/mock-route.stub';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('PostDetailviewComponent', () => {
  let component: PostDetailviewComponent;
  let fixture: ComponentFixture<PostDetailviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostDetailviewComponent],
      imports: [MatProgressSpinnerModule, RouterTestingModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{ provide: ActivatedRoute, useValue: mockRoute }],
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
