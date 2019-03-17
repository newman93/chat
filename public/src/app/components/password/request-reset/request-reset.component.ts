import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-request-reset',
  templateUrl: './request-reset.component.html',
  styleUrls: ['./request-reset.component.scss']
})
export class RequestResetComponent implements OnInit {
  public form = {
    email: null
  };

  constructor(
      private Api: ApiService,
      ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.Api.sendPasswordResetLink(this.form).subscribe(
      data => this.handleResponse(data),
      error => console.log(error.error.error)
    );
  }

  handleResponse(response) {
    this.form.email = null;
  }
}
