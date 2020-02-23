import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  public userData = {
    id: null,
    avatar: null,
    username: null,
    name: null,
    surname: null
  }

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(
      private userDataService: UserDataService,
  ){
  }

  ngOnInit() {
    this.userData.username = this.userDataService.get('id');
    this.userData.username = this.userDataService.get('username');
    this.userData.name = this.userDataService.get('name');
    this.userData.surname = this.userDataService.get('surname');
    this.userData.avatar = this.userDataService.getAvatar();
  }
}
