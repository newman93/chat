import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {Observable} from "rxjs";
import {IFoundUser} from "../../../../models/ifound-user";
import {IUserInvitation} from "../../../../models/iuser-invitation";
import {UserDataService} from "../../../../services/user-data.service";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {
  public searchUserForm = {
    search: null
  };

  public foundUsers: Observable<IFoundUser[]> = null;
  public sentInvitations: Observable<IUserInvitation[]> = null;
  public waitingInvitations: Observable<IUserInvitation[]> = null;

  constructor(
      private Api: ApiService,
      private userDataService: UserDataService
  ) {
  }

  ngOnInit() {
    this.Api.getSentInvitations().subscribe(
      data => this.handleSentInvitationsResponse(data),
        error => this.handleErrors(error)

    );
    this.Api.getWaitingInvitations().subscribe(
        data => this.handleWaitingInvitationsResponse(data),
        error => this.handleErrors(error)

    );
  }

  onSubmitSearchUser(e) {
    e.preventDefault();
    this.searchUser();
  }

  searchUser() {
    this.Api.searchContact(this.searchUserForm.search).subscribe(
        data => this.handleSearchUserResponse(data),
        error => this.handleErrors(error)
    );
  }

  prepareAvatars(data) {
    data.map((value, index) =>
        {
          value.contact.avatar = this.userDataService.getAvatar(value.contact.avatar, value.contact.username);
          value.username.avatar = this.userDataService.getAvatar(value.username.avatar, value.username.username);
          return value;
        }
    );

    return data;
  }

  handleSearchUserResponse(data) {
    this.foundUsers = this.prepareAvatars(data);
  }

  handleSentInvitationsResponse(data) {
    this.sentInvitations = this.prepareAvatars(data);
  }

  handleWaitingInvitationsResponse(data) {
    this.waitingInvitations = this.prepareAvatars(data);
  }

  handleErrors(error) {
    console.log(error);
  }

}
