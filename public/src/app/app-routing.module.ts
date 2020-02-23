import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { BeforeLoginService } from './services/before-login.service';
import { AfterLoginService } from './services/after-login.service';
import { AuthComponent } from './components/authorization/auth/auth.component';
import { ApplicationComponent } from './components/application-root/application/application.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SettingsComponent } from './components/application-root/right-panel/settings/settings.component';
import { MessagesComponent } from './components/application-root/right-panel/messages/messages.component';
import { AddUsersComponent } from './components/application-root/right-panel/add-users/add-users.component';
import { EmptyRightPanelComponent } from './components/application-root/right-panel/empty-right-panel/empty-right-panel.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'application'
  },
  {
    path: 'auth',
    component: AuthComponent,
    children : [
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }
    ],
    canActivate: [BeforeLoginService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AfterLoginService]
  },
  {
    path: 'application',
    component: ApplicationComponent,
    children: [
      {
        path: '',
        component: EmptyRightPanelComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: 'messages/:fromUsernameId',
        component: MessagesComponent
      },
      {
        path: 'add',
        component: AddUsersComponent
      }
    ],
    canActivate: [AfterLoginService]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
