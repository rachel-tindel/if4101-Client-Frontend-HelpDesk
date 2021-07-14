import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { IssueComponent } from './components/issue/issue.component';
import { HomeComponent } from './components/home/home.component';
import { IssuesComponent } from './components/issues/issues.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { IssueDetailsComponent } from './components/issue-details/issue-details.component';


const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login'   , component: LoginComponent },
  { path: 'create-issue'   , component: IssueComponent,canActivate:[ AuthGuard] },
  { path: 'issues'   , component: IssuesComponent,canActivate:[ AuthGuard] },
  { path: 'issues-details/:id'   , component: IssueDetailsComponent,canActivate:[ AuthGuard] },
  { path: 'home'   , component: HomeComponent,canActivate:[ AuthGuard] },
  { path: 'profile'   , component: ProfileComponent,canActivate:[ AuthGuard] },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
