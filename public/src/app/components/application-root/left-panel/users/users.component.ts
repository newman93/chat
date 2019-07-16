import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { UserDataService } from '../../../../services/user-data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  public users = null;
  private error = null;
  constructor(
      private userDataService: UserDataService,
      private Api: ApiService
  ) { }

  ngOnInit() {
    this.Api.getContacts(this.userDataService.get('id')).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.users = data;
    this.users.map((value, index) =>
        {
            if (!(value.contact.avatar.indexOf('/') > -1)) {
              value.contact.avatar = `${this.baseUrl}/images/${value.contact.username}/${value.contact.avatar}`;
            }
          return value;
        }
    );
  }

  handleError(error) {
    this.error = error.error.error;
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }

}
