import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewComponent } from './blog-overview.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BlogOverviewComponent', () => {
  let component: BlogOverviewComponent;
  let fixture: ComponentFixture<BlogOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BlogOverviewComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
