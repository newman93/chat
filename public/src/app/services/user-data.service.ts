import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor() { }

  handle(data) {
    this.set(data);
  }

  set(data) {
    localStorage.setItem('username', data.id);
    localStorage.setItem('username', data.username);
    localStorage.setItem('name', data.name);
    localStorage.setItem('surname', data.surname);
    localStorage.setItem('e_mail', data.e_mail);
    localStorage.setItem('avatar', data.avatar);
  }

  remove() {
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    localStorage.removeItem('surname');
    localStorage.removeItem('e_mail');
    localStorage.removeItem('avatar');
  }

  get(key) {
    return localStorage.getItem(key);
  }
}
