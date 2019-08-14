import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';

import { WebsocketService } from './websocket.service';
import {IMessageSocket, MESSAGE} from "../models/socket/imessage-socket";
import {ILoginSocket, LOGIN} from "../models/socket/ilogin-socket";

const CHAT_URL = 'ws://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public messagesSocket: Subject<IMessageSocket>;
  public loginSocket: Subject<ILoginSocket>;
  public subjectSocket: Subject<MessageEvent>;
  public loginObservable: Subject<ILoginSocket>;
  public messageObservable: Subject<IMessageSocket>;

  constructor(
      private wsService: WebsocketService
  ) {
        this.loginSocket = <Subject<ILoginSocket>>Subject.create();
        this.messagesSocket = <Subject<IMessageSocket>>Subject.create();
        this.subjectSocket = <Subject<MessageEvent>>Subject.create();
        this.loginObservable =  new Subject<ILoginSocket>();
        this.messageObservable = new Subject<IMessageSocket>();
  }

  public  getConnection() {
      let that = this;

      return new Promise(function (resolve, reject) {
          return that.wsService.connect(CHAT_URL).then(function () {
              // that.messagesSocket = <Subject<IMessageSocket>><unknown>that.wsService.getSubject();
              // .map(
              //     (response: MessageEvent): IMessageSocket => {
              //         let data = JSON.parse(response.data);
              //             return data;
              //
              //     }
              // );

              // that.loginSocket = <Subject<ILoginSocket>><unknown>that.wsService.getSubject();
              // .map(
              //     (response: MessageEvent): ILoginSocket => {
              //         let data = JSON.parse(response.data);
              //         console.log('login');
              //             return data;
              //
              //     }
              // );
              that.subjectSocket = <Subject<MessageEvent>>that.wsService.getSubject();
              resolve();
          });
      });
  }

}
