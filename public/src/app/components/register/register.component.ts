import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { TokenService } from '../../services/token.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public form = {
    username: null,
    e_mail: null,
    name: null,
    surname: null,
    password: null,
    password_confirmation: null,
    avatar: null
  };

  public error: string[] = [];

  constructor(
      private Api: ApiService,
      private Token: TokenService,
      private router: Router,
      private ngxSmartModalService: NgxSmartModalService
      ) { }

  onSubmit() {
    this.Api.register(this.form).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.Token.handle(data.access_token);
    this.router.navigateByUrl('/profile');
  }

  handleError(error) {
      for (let errorType in error.error.errors) {
         for (let errorIndex in error.error.errors['' + errorType + '']) {
             this.error.push(error.error.errors['' + errorType + '']['' + errorIndex + '']);
         };
      };
      this.ngxSmartModalService.setModalData(this.error.join('\n'), 'registerErrorModal');
      this.ngxSmartModalService.getModal('registerErrorModal').open();
  }

  ngOnInit() {
  }

}
