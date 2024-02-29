import {EventEmitter, Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {
  // @ts-ignore
  stompClient;
  messageEmitter: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }
  initializeWebSocketConnection() {
    const socket = new SockJS('http://localhost:8090/Poker/pokerplaning');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame:any) => {
      console.log(frame);
      this.stompClient.subscribe('/topic/session', (result:any) => {
        this.show(result);
      });
    });
  }
  show(message: string) {
    console.log('sayee' , message)  ;
    this.messageEmitter.emit(message);

  }
  sendMessage() {
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    this.stompClient.send('/app/update' , {},81);
  }

}
