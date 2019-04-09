import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public form = {
    username: null,
    password: null
  };

  public error = null;

  constructor(
      private Api: ApiService,
      private Token: TokenService,
      private router: Router,
      private Auth: AuthService,
      private ngxSmartModalService: NgxSmartModalService) {
      }

  onSubmit() {
    this.Api.login(this.form).subscribe(
      data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.Auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.error;
    this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
    this.ngxSmartModalService.getModal('loginErrorModal').open();
  }

  redirectToRegister() {
    this.router.navigate(['auth/register']);
  }

  ngOnInit() {
  }

}
