import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOverviewComponent } from './post-overview.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

class MockService {
  handleAuth() {}
}

class MockRouter {
  navigate() {}
}

const FakeActivatedRoute = {
  snapshot: { data: { } }
} as ActivatedRoute;

describe('PostOverviewComponent', () => {
  let component: PostOverviewComponent;
  let fixture: ComponentFixture<PostOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostOverviewComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        ActivatedRoute,
        { provide: AuthService, useClass: MockService },
        { provide: Router, useClass: MockRouter },
        { provide: ActivatedRoute, useValue: FakeActivatedRoute }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
