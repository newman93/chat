import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class MessageService {
  private listners = new Subject<any>();

  listen(): Observable<any> {
    return this.listners.asObservable();
  }

  filter(filterBy: bigint) {
    this.listners.next(filterBy);
  }

}

