import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ApiService } from '../../../../services/api.service';
import { UserDataService } from '../../../../services/user-data.service';
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {IUser} from "../../../../models/iuser";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  private baseUrl = 'http://localhost:8000/api';
  public users = null;
  private error = null;
  @Input() contacts: Observable<IUser[]>;
  // @Output() onFilter: EventEmitter<bigint> = new EventEmitter();

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      // private messageService: MessageService
      private router: Router
  ) {  }

  ngOnInit() {
  }

  // ngOnInit() {
  //   this.Api.getContacts().subscribe(
  //       data => this.handleResponse(data),
  //       error => this.handleError(error)
  //   );
  // }
  //
  getMessages(fromUsernameId) {
    // this.messageService.filter(fromUsernameId);
    this.router.navigate(['/application/messages', fromUsernameId]);
  }
  //
  // handleResponse(data) {
  //   this.users = data;
  //   this.users.map((value, index) =>
  //       {
  //         value.contact.avatar = this.userDataService.getAvatar(value.contact.avatar, value.contact.username);
  //         return value;
  //       }
  //   );
  // }
  //
  // handleError(error) {
  //   this.error = error.error.error;
  //   // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  // }

}
