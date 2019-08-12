import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../../../services/user-data.service";
import {AuthService} from "../../../../services/auth.service";
import {ApiService} from "../../../../services/api.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public changeAvatarForm = {
    avatar: null,
    avatar_name: null
  };

  public changeNameAndSurnameForm = {
    name: null,
    surname: null
  };

  public imgSrc = null;

  constructor(
      private userDataService: UserDataService,
      private Auth: AuthService,
      private Api: ApiService
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {}

  logout() {
    this.userDataService.remove();
    this.Auth.changeAuthStatus(false);
    window.location.href = 'http://localhost:4200/application';
  }

  uploadFile(files: FileList) {
    this.changeAvatarForm.avatar = files[0];
    this.changeAvatarForm.avatar_name = files[0].name;
    this.previewFile(files);
  }

  previewFile(files: FileList) {
    if (files && files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.imgSrc = event.target.result;
      };

      reader.readAsDataURL(files[0]);
    }
  }

  onSubmitChangeAvatar(e) {
    e.preventDefault();
    this.changeAvatar();
  }


  changeAvatar() {
    const formData = new FormData();

    formData.append('avatar', this.changeAvatarForm.avatar, this.changeAvatarForm.avatar_name);

    let obj = {};
    obj[this.userDataService.USER_DATA_KEYS.avatar] = this.changeAvatarForm.avatar_name;

    this.Api.changeAvatarApi(formData).subscribe(
        data =>
            this.handleResponse(data, obj),
        error => this.handleError(error)
    );
  }

  onSubmitChangeNameAndSurname(e) {
    e.preventDefault();
    this.changeNameAndSurname();
  }

  changeNameAndSurname() {
    const formData = new FormData();

    formData.append('name', this.changeNameAndSurnameForm.name);
    formData.append('surname', this.changeNameAndSurnameForm.surname);

    let obj = {};
    obj[this.userDataService.USER_DATA_KEYS.name] = this.changeNameAndSurnameForm.name;
    obj[this.userDataService.USER_DATA_KEYS.surname] = this.changeNameAndSurnameForm.surname;

    this.Api.changeNameAndSurnameApi(formData).subscribe(
        data =>
            this.handleResponse(data, obj),
        error => this.handleError(error)
    );
  }


  handleResponse(data, obj) {
    for (let key in obj) {
      this.userDataService.changeDataByKeyWithReload(key, obj[key]);
    }
    console.log(data);
  }

  handleError(data) {
    console.log(data);
  }


}
