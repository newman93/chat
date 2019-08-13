import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

import {SearchUserComponent} from "../search-user/search-user.component";

@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.scss']
})
export class UsersMenuComponent implements OnInit {
  @Input() searchUser: SearchUserComponent;

  constructor(
      private router: Router
  ) { }

  ngOnInit() {
  }

  getSettings() {
    this.router.navigate(['application/settings']);
  }

  getAddUser() {
    this.router.navigate(['application/add']);
  }

  getContacts() {
    this.searchUser.getContacts();
  }
}
