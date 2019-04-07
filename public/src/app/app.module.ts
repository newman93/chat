import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { TokenService } from './services/token.service';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthService } from './services/auth.service';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AuthComponent } from './auth/auth.component';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AuthComponent
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
      ApiService, TokenService, AuthService, AfterLoginService, BeforeLoginService, NgxSmartModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
