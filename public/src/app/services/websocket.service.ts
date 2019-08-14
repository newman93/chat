import { Injectable } from '@angular/core';
import * as Rx from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() { }

  private subject: Rx.Subject<MessageEvent>;

  public connect(url) {
    let that = this;
    return new Promise(function(resolve, reject) {
      if (!that.subject) {
          let ws = new WebSocket(url);
          ws.onopen = function()  {
            resolve(that.create(ws));
          }
        } else {
          resolve();
        }
      });
  }

  public getSubject(): Rx.Subject<MessageEvent> {
    return this.subject;
  }

  private create(ws): Rx.Subject<MessageEvent> {
    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);

      return ws.close.bind(ws);
    });

    let observer = {
      next: (data: Object) => {
        console.log('next');
        if (ws.readyState === WebSocket.OPEN) {
          console.log('next2');
          ws.send(JSON.stringify(data));
        }
      }
    };

    this.subject =  Rx.Subject.create(observer, observable);

    return this.subject;
  }
}
