import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  public userData = {
    avatar: null,
    username: null,
    name: null,
    surname: null
  }

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userData.username = this.userDataService.get('username');
    this.userData.name = this.userDataService.get('name');
    this.userData.surname = this.userDataService.get('surname');
    if (this.userDataService.get('avatar').indexOf('/') > -1) {
      this.userData.avatar = this.userDataService.get('avatar');
    } else {
      this.userData.avatar = `${this.baseUrl}/images/${this.userDataService.get('username')}/${this.userDataService.get('avatar')}`;
    }
  }

}
