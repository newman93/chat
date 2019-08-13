import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ChatService} from "../../../services/chat.service";
import {UserDataService} from "../../../services/user-data.service";
import {LoginSocket} from "../../../models/socket/ilogin-socket";


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
    // this.chatService.loginSocket.next(new LoginSocket(this.userDataService.get('id')));
    this.chatService.getConnection().then(function() {
      that.chatService.loginSocket.subscribe(
          msg  => {

            console.log(msg)
          }
      );
      that.chatService.loginSocket.next(new LoginSocket(that.userDataService.get('id')));
    });
    console.log('ini');
  }
}
