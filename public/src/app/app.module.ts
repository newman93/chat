import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/authorization/login/login.component';
import { RegisterComponent } from './components/authorization/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthComponent } from './components/authorization/auth/auth.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';
import { UserDataService } from './services/user-data.service';
import { ApplicationComponent } from './components/application-root/application/application.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UserDataComponent } from './components/application-root/left-panel/user-data/user-data.component';
import { SearchUserComponent } from './components/application-root/left-panel/search-user/search-user.component';
import { UsersComponent } from './components/application-root/left-panel/users/users.component';
import { UsersMenuComponent } from './components/application-root/left-panel/users-menu/users-menu.component';
import { EmptyRightPanelComponent } from './components/application-root/right-panel/empty-right-panel/empty-right-panel.component';
import { SettingsComponent } from './components/application-root/right-panel/settings/settings.component';
import { MessagesComponent } from './components/application-root/right-panel/messages/messages.component';
import { AddUsersComponent } from './components/application-root/right-panel/add-users/add-users.component';
import { MessageService } from './services/messages.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthComponent,
    ApplicationComponent,
    PageNotFoundComponent,
    UserDataComponent,
    SearchUserComponent,
    UsersComponent,
    UsersMenuComponent,
    EmptyRightPanelComponent,
    SettingsComponent,
    MessagesComponent,
    AddUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    NgxSmartModalModule.forRoot()
  ],
  providers: [
      ApiService, TokenService, AuthService, AfterLoginService, BeforeLoginService,
      UserDataService, NgxSmartModalService, MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
