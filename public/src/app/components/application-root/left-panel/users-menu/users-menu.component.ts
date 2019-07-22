import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-users-menu',
  templateUrl: './users-menu.component.html',
  styleUrls: ['./users-menu.component.scss']
})
export class UsersMenuComponent implements OnInit {

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
    this.router.navigate(['/application']);
  }
}
