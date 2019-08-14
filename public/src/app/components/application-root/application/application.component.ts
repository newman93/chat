import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {UserDataService} from "../../../services/user-data.service";
import {ILoginSocket, LOGIN, LoginSocket} from "../../../models/socket/ilogin-socket";
import {IMessageSocket, MESSAGE, MessageSocket} from "../../../models/socket/imessage-socket";


@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApplicationComponent implements OnInit {

  constructor(
      private userDataService: UserDataService,
      private chatService: ChatService
  ) {
  }


  ngOnInit() {
    let that = this;
    this.chatService.getConnection().then(function() {
      // that.chatService.loginSocket.subscribe(
      //     msg  => {
      //
      //       console.log(msg);
      //     }
      // );
      // that.chatService.messagesSocket.subscribe(
      //     msg => {
      //         console.log(msg);
      //     }
      // );
      // that.chatService.loginSocket.next(new LoginSocket(that.userDataService.get('id')));
        that.chatService.subjectSocket.subscribe(
            msg => {
                console.log('subject1');
                console.log(msg);
                let data = JSON.parse(msg.data);
                if (data.constructor === Array) {
                    for (let i = 0; i < data.length; ++i) {
                        console.log('subject data Array');
                        console.log(data[i]);
                        switch (data[i].type) {
                            case LOGIN:
                                console.log('subject2');
                                that.chatService.loginObservable.next(data[i]);
                                break;
                            case MESSAGE:
                                console.log('subject3');
                                that.chatService.messageObservable.next(data[i]);
                        }
                    }
                } else {
                    console.log('subject data');
                    console.log(data);
                    switch (data.type) {
                        case LOGIN:
                            console.log('subject2');
                            that.chatService.loginObservable.next(data);
                            break;
                        case MESSAGE:
                            console.log('subject3');
                            that.chatService.messageObservable.next(data);
                    }
                }

            }
        )
        that.chatService.loginObservable.subscribe(
            msg => {
                console.log('login observable');
                console.log(msg);
            }
        )

        that.chatService.messageObservable.subscribe(
            msg => {
                console.log('message observable');
                console.log(msg);
            }
        )
        that.chatService.subjectSocket.next(<unknown>new LoginSocket(that.userDataService.get('id')) as MessageEvent);
    });
    console.log('ini');
  }
}
