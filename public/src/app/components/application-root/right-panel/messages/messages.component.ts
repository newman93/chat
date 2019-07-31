import {Component, Input, OnInit} from '@angular/core';
import {UserDataService} from "../../../../services/user-data.service";
import {ApiService} from "../../../../services/api.service";
import {MessageService} from "../../../../services/messages.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {Message} from "../../../../models/message";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  private fromUsernameId = null;
  public data = null;
  public messages: Observable<Message[]>;
  private error = null;

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      private activatedRoute: ActivatedRoute,
      private router: Router
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

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    this.data.messages.push({ from_username:
          {
            id: 2,
            name: 'aa',
            surname: 'bb'
          }, date: dateTime, message: 'test'});
  }

}
