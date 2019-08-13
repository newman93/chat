import {Component, Input, OnInit} from '@angular/core';
import {UserDataService} from "../../../../services/user-data.service";
import {ApiService} from "../../../../services/api.service";
import {MessageService} from "../../../../services/messages.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import { IMessage, Message } from '../../../../models/message';
import {ChatService} from "../../../../services/chat.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  private fromUsernameId = null;
  public data = null;
  public messages: Observable<IMessage[]>;
  private error = null;

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private chatService: ChatService
      // private messageService: MessageService
  ) {
    // this.messageService.listen().subscribe((m:any) => {
    //     console.log(2);
    //     this.getMessages(m);
    // });
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      // do your task for before route

      return false;
    }
  }

  ngOnInit() {
    this.fromUsernameId = this.activatedRoute.snapshot.params['fromUsernameId'];
    this.getMessages(this.fromUsernameId);
  }

  getMessages(fromUsernameId) {
    this.Api.getMessages(fromUsernameId, this.userDataService.get('id')).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  handleResponse(data) {
    this.data = data;
    this.data.avatar = this.userDataService.getAvatar(data.avatar, data.username);

    this.data.messages.map((value, index) =>
        {
          value.from_username.avatar = this.userDataService.getAvatar(value.from_username.avatar, value.from_username.username);
          value.to_username.avatar = this.userDataService.getAvatar(value.to_username.avatar, value.to_username.username);

          delete Object.assign(value, {fromUsername: value.from_username }).from_username;
          delete Object.assign(value, {toUsername: value.to_username }).to_username;

          return value;
        }
    );
  }

  handleError(error) {
    this.error = error.error.error;
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }

  sendMessage(message) {
    this.Api.sendMessage(this.userDataService.get('id'), this.fromUsernameId, message);

    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime: string = date+' '+time;
    let id: bigint = <bigint><unknown> this.userDataService.get('id');

    this.data.messages.push(new Message(
        dateTime,
        id,
        this.userDataService.get('name'),
        this.userDataService.get('surname'),
        message)
    );

    this.chatService.messages.next({ type: 'login'});
  }

}
