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

  constructor(
      private userDataService: UserDataService,
      private Api: ApiService,
      private router: Router
  ) {  }

  ngOnInit() {
  }


  getMessages(fromUsernameId) {
    this.router.navigate(['/application/messages', fromUsernameId]);
  }
}
