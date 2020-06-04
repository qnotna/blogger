import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './features/main/container/main.component';
import { LoginComponent } from './features/login/login.component';
import { PostOverviewComponent } from './features/post-overview/container/post-overview.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: MainComponent,
    children: [
      {
        path: 'blogs/:blogId',
        redirectTo: 'blogs/:blogId/posts'
      },
      {
        path: 'blogs/:blogId/posts',
        component: PostOverviewComponent,
      },
      {
        path: 'blogs/:blogId/posts/search',
        component: PostOverviewComponent,
      }
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
