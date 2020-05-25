import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainComponent,
    canActivate: [ AuthGuard ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
