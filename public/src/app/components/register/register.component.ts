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
    username:  null,
    e_mail: null,
    name: null,
    surname: null,
    password: null,
    password_confirmation: null,
    avatar: null,
    avatar_name: null
  };

  public imgSrc = 'assets/img/avatars/avatar.png';

  public error: string[] = [];

  constructor(
      private Api: ApiService,
      private Token: TokenService,
      private router: Router,
      private ngxSmartModalService: NgxSmartModalService
      ) { }

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

  register() {
    let formData = new FormData();
    if (this.form.avatar !== null) {
        formData.append('avatar', this.form.avatar, this.form.avatar_name);
    }
    formData.append('username', this.form.username);
    formData.append('name', this.form.name);
    formData.append('surname', this.form.surname);
    formData.append('password', this.form.password);
    formData.append('password_confirmation', this.form.password_confirmation);
    formData.append('e_mail', this.form.e_mail);

    this.Api.register(formData).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
  );
  }

  uploadFile(files: FileList) {
      this.form.avatar = files[0];
      this.form.avatar_name = files[0].name;
      this.previewFile(files);
  }

  previewFile(files: FileList) {
      if (files && files[0]) {
          let reader = new FileReader();

          reader.onload = (event:any) => {
              this.imgSrc = reader.result;
          }

          reader.readAsDataURL(files[0]);
      }
  }

}
