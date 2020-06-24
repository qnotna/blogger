import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBlogsComponent } from './no-blogs.component';

describe('NoBlogsComponent', () => {
  let component: NoBlogsComponent;
  let fixture: ComponentFixture<NoBlogsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NoBlogsComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
