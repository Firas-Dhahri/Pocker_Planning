import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private socket$: WebSocketSubject<any>;

  constructor() {
    this.socket$ = new WebSocketSubject<any>('ws://localhost:8089/ws');
  }

  sendMessage(message: any) {
    this.socket$.next(message);
  }

  getMessage(): Observable<any> {
    return this.socket$.asObservable();
  }

}