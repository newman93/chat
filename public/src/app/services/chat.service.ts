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

  constructor(
      private wsService: WebsocketService
  ) {
        this.loginSocket = <Subject<ILoginSocket>>Subject.create();

      // this.loginSocket = <Subject<ILoginSocket>>wsService.connect(CHAT_URL).map(
      //     (response: MessageEvent): ILoginSocket => {
      //         let data = JSON.parse(response.data);
      //           console.log('login');
      //         if (data.type == LOGIN) {
      //             return data;
      //         }
      //     }
      // );
  }

  public  getConnection() {
      let that = this;

      return new Promise(function (resolve, reject) {
          return that.wsService.connect(CHAT_URL).then(function () {
              that.messagesSocket = <Subject<IMessageSocket>>that.wsService.getSubject().map(
                  (response: MessageEvent): IMessageSocket => {
                      let data = JSON.parse(response.data);
                      console.log('message');
                      if (data.type == MESSAGE) {
                          return data;
                      }
                  }
              );

              that.loginSocket = <Subject<ILoginSocket>>that.wsService.getSubject().map(
                  (response: MessageEvent): ILoginSocket => {
                      let data = JSON.parse(response.data);
                      console.log('login');
                      if (data.type == LOGIN) {
                          return data;
                      }
                  }
              );
              resolve();
          });
      });
  }

  public getLoginSocket() {
      return this.loginSocket;
  }
}
