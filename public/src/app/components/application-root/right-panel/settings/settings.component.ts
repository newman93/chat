import { Component, OnInit } from '@angular/core';
import {UserDataService} from "../../../../services/user-data.service";
import {AuthService} from "../../../../services/auth.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  constructor(private userDataService: UserDataService, private Auth: AuthService) {
    this.userDataService = userDataService;
  }

  ngOnInit() {
  }

  logout() {
    this.userDataService.remove();
    this.Auth.changeAuthStatus(false);
    window.location.href = 'http://localhost:4200/application';

  }

}
