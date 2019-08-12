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

  submitAvatar() {
    const formData = new FormData();

    formData.append('avatar', this.changeAvatarForm.avatar, this.changeAvatarForm.avatar_name);
    this.Api.changeAvatar(formData).subscribe(
        data => this.handleResponse(data),
        error => this.handleResponse(error)
    );
  }

  handleResponse(data) {
    this.userDataService.changeDataByKeyWithReload(
        this.userDataService.USER_DATA_KEYS.avatar, this.changeAvatarForm.avatar_name
    );
    console.log(data);
  }
}
