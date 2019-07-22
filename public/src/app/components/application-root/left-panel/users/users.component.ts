import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { UserDataService } from '../../../../services/user-data.service';
import {MessageService} from "../../../../services/messages.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  public users = null;
  private error = null;
  // @Output() onFilter: EventEmitter<bigint> = new EventEmitter();

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      // private messageService: MessageService
      private router: Router
  ) {  }

  ngOnInit() {
    this.Api.getContacts(this.userDataService.get('id')).subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  getMessages(fromUsernameId) {
    // this.messageService.filter(fromUsernameId);
    this.router.navigate(['/application/messages', fromUsernameId]);
  }

  handleResponse(data) {
    this.users = data;
    this.users.map((value, index) =>
        {
          value.contact.avatar = this.userDataService.getAvatar(value.contact.avatar, value.contact.username);
          return value;
        }
    );
  }

  handleError(error) {
    this.error = error.error.error;
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }

}
