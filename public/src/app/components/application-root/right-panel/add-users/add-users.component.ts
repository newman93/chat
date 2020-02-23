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
    const formData = new FormData();

    formData.append('user', this.searchUserForm.search);

    this.Api.searchUserApi(formData).subscribe(
        data => this.handleSearchUserResponse(data),
        error => this.handleErrors(error)
    );
  }

  prepareAvatars(data) {
    data.map((value, index) =>
        {
          value.contact.avatar = this.Api.getAvatarApi(value.contact.username, value.contact.avatar);
          value.username.avatar = this.Api.getAvatarApi(value.username.username, value.username.avatar);
          return value;
        }
    );

    return data;
  }

  prepareAvatarsFoundUsers(data) {
    data.map((value, index) =>
        {
          value.avatar = this.Api.getAvatarApi(value.username, value.avatar);
          return value;
        }
    );

    return data;
  }

  handleSearchUserResponse(data) {
    this.foundUsers = this.prepareAvatarsFoundUsers(data);
  }

  handleSentInvitationsResponse(data) {
    this.sentInvitations = this.prepareAvatars(data);
  }

  handleWaitingInvitationsResponse(data) {
    this.waitingInvitations = this.prepareAvatars(data);
  }

  inviteContact(userId) {
    this.Api.inviteContactApi(userId).subscribe(
      data => this.handleResponse(data),
      error => this.handleErrors(error)
    );
  }

  addContact(userId) {
    this.Api.addContactApi(userId).subscribe(
        data => this.handleResponse(data),
        error => this.handleErrors(error)
    );
  }

  cancelContact(userId) {
    this.Api.cancelContactApi(userId).subscribe(
        data => this.handleResponse(data),
        error => this.handleErrors(error)
    );
  }

  handleResponse(data) {
   console.log(data);
  }

  handleErrors(error) {
    console.log(error);
  }
}
