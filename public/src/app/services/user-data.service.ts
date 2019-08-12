import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private baseUrl = 'http://localhost:8000/api';

  readonly USER_DATA_KEYS = {
    id: 'id',
    username: 'username',
    name: 'name',
    surname: 'surname',
    e_mail: 'e_mail',
    avatar: 'avatar'
  }

  constructor() { }

  handle(data) {
    this.set(data);
  }

  set(data) {
    localStorage.setItem('id', data.id);
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

  getAvatar(avatar, username) {
    if (!(avatar.indexOf('/') > -1)) {
      return `${this.baseUrl}/images/${username}/${avatar}`;
    } else {
      return avatar;
    }
  }

  changeDataByKeyWithReload(key, value) {
    localStorage[key] =  value;
    location.reload();
  }

}
