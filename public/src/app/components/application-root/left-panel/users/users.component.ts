import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users = null;
  private error = null;
  constructor(
      private userData: UserDataService,
      private Api: ApiService
  ) { }

  ngOnInit() {
    this.Api.getContacts(this.userData.get('username')).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.users = data;
    console.log(data);
  }

  handleError(error) {
    this.error = error.error.error;
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }

}
