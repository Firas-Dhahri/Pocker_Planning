import {EventEmitter, Injectable} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Subject} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class WebsocketserviceService {
  public stompClient: any;
  public isConnected: boolean = false;
  receivedMessage:any ;
  constructor() { }
  private sessionResponseSubject = new Subject<any>();
 /* connectToWebSocket(): void {
    if (!this.isConnected) {
      const socket = new SockJS('http://localhost:8090/pokerplaning');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: any) => {

        this.stompClient.subscribe('/topic/session', (result: any) => {
          this.isConnected = true;
          console.log("hedhy reponsee" , result)
        });
      });
    }
  }
  getStompClient(): any {
    return this.stompClient;
  }*/
  connectToWebSocket(): void {
    if (!this.stompClient) {
      const socket = new SockJS('http://localhost:8090/pokerplaning');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: any) => {
        this.isConnected = true;
        this.stompClient.subscribe('/topic/session', (result: any) => {
          const message = JSON.parse(result.body);
          this.receivedMessage = message ;

        });
      });
    }
  }


  getReceivedMessage(): any {
    return this.receivedMessage;
  }

  subscribeToSessionTopic(callback: (result: any) => void): void {
    if (this.isConnected) {
      this.stompClient.subscribe('/topic/session', callback);
    }
  }

  getStompClient(): any {
    return this.stompClient;
  }
  getSessionResponseObservable() {
    return this.sessionResponseSubject.asObservable();
  }

 /* subscribeToSessionTopic(): void {
    if (!this.isConnected) {
      console.error("WebSocket connection not established.");
      return;
    }
    this.stompClient.subscribe('/topic/session', (result: any) => {
      const message = JSON.parse(result.body);

    });
  }*/

}
