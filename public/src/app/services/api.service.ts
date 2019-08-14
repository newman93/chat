import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {UserDataService} from "./user-data.service";
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseAuthUrl = 'http://localhost:8000/api/auth';
  private baseUrl = 'http://localhost:8000/api';
  private userId =  1
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.tokenService.get()}`
    })
  };

  constructor(
      private http: HttpClient,
      // private userDataService: UserDataService,
      private tokenService: TokenService
      ) {

  }

  register(data) {
      return this.http.post(`${this.baseAuthUrl}/register`, data, this.headers);
  }

  login(data) {
      return this.http.post(`${this.baseAuthUrl}/login`, data, this.headers);
  }

  getMessages(fromUsernameId, toUsernameId) {
      return this.http.get(`${this.baseAuthUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/load`, this.headers);
  }

  sendMessage(fromUsernameId, toUsernameId, message) {
      const params = { 'message' : message };

      return this.http.post(`${this.baseAuthUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/send`, params, this.headers).subscribe();
  }

  changeAvatarApi(data) {
    return this.http.post(`${this.baseAuthUrl}/settings/user/${this.userId}/change/avatar`, data, this.headers);
  }

  changeNameAndSurnameApi(data) {
    return this.http.post(`${this.baseAuthUrl}/settings/user/${this.userId}/change/nameAndSurname`, data, this.headers);
  }

  changeEMailApi(data) {
    return this.http.post(`${this.baseAuthUrl}/settings/user/${this.userId}/change/email`, data, this.headers);
  }

  changePasswordApi(data) {
    return this.http.post(`${this.baseAuthUrl}/settings/user/${this.userId}/change/password`, data, this.headers);
  }

  getContacts() {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/get`, this.headers);
  }

  searchContactApi(data) {
    return this.http.post(`${this.baseAuthUrl}/contacts/user/${this.userId}/contact/search`, data, this.headers);
  }

  getSentInvitations() {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/invitations/sent`, this.headers);
  }

  searchUserApi(data) {
    return this.http.post(`${this.baseAuthUrl}/contacts/user/${this.userId}/user/search`, data, this.headers);
  }

  getWaitingInvitations() {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/invitations/waiting`, this.headers);
  }

  inviteContactApi(contactId) {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/contact/${contactId}/invite`, this.headers);
  }

  addContactApi(contactId) {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/contact/${contactId}/add`, this.headers);
  }

  cancelContactApi(contactId) {
    return this.http.get(`${this.baseAuthUrl}/contacts/user/${this.userId}/contact/${contactId}/cancel`, this.headers);
  }

  getAvatarApi(username, avatar) {
    if (!(avatar.indexOf('/') > -1)) {
      return `${this.baseUrl}/images/username/${username}/avatar/${avatar}`;
    } else {
      return avatar;
    }
  }
}
