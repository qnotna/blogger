import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogOverviewItemComponent } from './blog-overview-item.component';

describe('BlogOverviewItemComponent', () => {
  let component: BlogOverviewItemComponent;
  let fixture: ComponentFixture<BlogOverviewItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogOverviewItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogOverviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
