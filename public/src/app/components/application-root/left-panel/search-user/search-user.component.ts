import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../services/api.service";
import {UserDataService} from "../../../../services/user-data.service";
import {Observable} from "rxjs";
import {IContact} from "../../../../models/icontact";

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {
  public contacts: Observable<IContact[]>;
  public searchContactForm = {
    search: null,
  };

  constructor(
      private Api: ApiService,
      private userDataService: UserDataService
  ) { }

  ngOnInit() {
    this.Api.getContacts().subscribe(
        data => this.handleResponse(data),
        error => this.handleError(error)
    );
  }

  onSubmitSearchContact(e) {
    e.preventDefault();
    this.searchContact();
  }

  searchContact() {
    const formData = new FormData();

    formData.append('contact', this.searchContactForm.search);

    this.Api.searchContactApi(formData).subscribe(
        data => this.handleSearchContactResponse(data),
        error => this.handleError(error)
    );
  }

  prepareAvatars(data) {
    data.map((value, index) =>
        {
          if (value.contact != null) {
            value.contact.avatar = this.userDataService.getAvatar(value.contact.avatar, value.contact.username);
          }

          return value;
        }
    );
    return data;
  }

  handleSearchContactResponse(data) {
    this.contacts = this.prepareAvatars(data);
  }

  handleResponse(data) {
    this.contacts = this.prepareAvatars(data);
  }

  handleError(error) {
    // this.ngxSmartModalService.setModalData(this.error, 'loginErrorModal');
  }
}
