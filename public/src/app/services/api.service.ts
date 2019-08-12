import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {UserDataService} from "./user-data.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';

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

  getContacts(username) {
      return this.http.get(`${this.baseUrl}/contacts/${ username }`);
  }

  getMessages(fromUsernameId, toUsernameId) {
    return this.http.get(`${this.baseUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/load`);
  }

  sendMessage(fromUsernameId, toUsernameId, message) {
      const params = { 'message' : message };

      return this.http.post(`${this.baseUrl}/messages/from/${fromUsernameId}/to/${toUsernameId}/send`, params).subscribe();
  }

  changeAvatarApi(data) {
    const userId = this.userDataService.get('id');

    return this.http.post(`${this.baseUrl}/settings/user/${userId}/change/avatar`, data);
  }

  changeNameAndSurnameApi(data) {
    const userId = this.userDataService.get('id');

    return this.http.post(`${this.baseUrl}/settings/user/${userId}/change/nameAndSurname`, data);
  }
}
