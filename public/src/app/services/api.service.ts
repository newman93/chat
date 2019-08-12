import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {UserDataService} from "./user-data.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';
  private userId =  this.userDataService.get('id');

  constructor(
      private http: HttpClient,
      private userDataService: UserDataService
      ) {

  }

  register(data) {
      return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data) {
      return this.http.post(`${this.baseUrl}/login`, data);
  }

  getMessages(fromUsernameId, toUsernameId) {
      return this.http.get(`${this.baseUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/load`);
  }

  sendMessage(fromUsernameId, toUsernameId, message) {
      const params = { 'message' : message };

      return this.http.post(`${this.baseUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/send`, params).subscribe();
  }

  changeAvatarApi(data) {
    return this.http.post(`${this.baseUrl}/settings/user/${this.userId}/change/avatar`, data);
  }

  changeNameAndSurnameApi(data) {
    return this.http.post(`${this.baseUrl}/settings/user/${this.userId}/change/nameAndSurname`, data);
  }

  changeEMailApi(data) {
    return this.http.post(`${this.baseUrl}/settings/user/${this.userId}/change/email`, data);
  }

  changePasswordApi(data) {
    return this.http.post(`${this.baseUrl}/settings/user/${this.userId}/change/password`, data);
  }

  getContacts() {
    return this.http.get(`${this.baseUrl}/contacts/user/${this.userId}/get `);
  }

  getSentInvitations() {
    return this.http.get(`${this.baseUrl}/contacts/user/${this.userId}/invitations/sent`);
  }

  getWaitingInvitations() {
    return this.http.get(`${this.baseUrl}/contacts/user/${this.userId}/invitations/waiting`);
  }

  searchContact(contact) {
    return this.http.get(`${this.baseUrl}/contacts/user/${this.userId}/contact/${contact}/search`);
  }

  addContact(contactId) {
    return this.http.get(`${this.baseUrl}/contacts/user/${this.userId}/contact/${contactId}/add`);
  }
}
