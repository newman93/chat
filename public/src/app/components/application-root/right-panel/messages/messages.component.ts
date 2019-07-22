import {Component, Input, OnInit} from '@angular/core';
import {UserDataService} from "../../../../services/user-data.service";
import {ApiService} from "../../../../services/api.service";
import {MessageService} from "../../../../services/messages.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  private fromUsernameId = null;
  public data = null;
  public messages = null;
  private error = null;

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      private activatedRoute: ActivatedRoute
      // private messageService: MessageService
  ) {
    // this.messageService.listen().subscribe((m:any) => {
    //     console.log(2);
    //     this.getMessages(m);
    // });
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

    console.log(data);
    // this.users.map((value, index) =>
    //     {
    //       if (!(value.contact.avatar.indexOf('/') > -1)) {
    //         value.contact.avatar = `${this.baseUrl}/images/${value.contact.username}/${value.contact.avatar}`;
    //       }
    //       return value;
    //     }
    // );
  }

  handleError(error) {
    this.error = error.error.error;
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }

}
