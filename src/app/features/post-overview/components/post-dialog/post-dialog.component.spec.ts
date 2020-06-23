import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDialogComponent } from './post-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

describe('PostDialogComponent', () => {
  let component: PostDialogComponent;
  let fixture: ComponentFixture<PostDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostDialogComponent],
      imports: [ReactiveFormsModule, CKEditorModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
