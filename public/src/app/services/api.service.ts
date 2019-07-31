import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {

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
}
