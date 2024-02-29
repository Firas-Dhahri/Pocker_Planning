import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';
import {MessageService} from 'primeng/api';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent {

  public readonly url = 'http://localhost:8090/Poker/pokerplaning';

  public readonly topicMessage = '/topic/public';

  public readonly topicChat = '/app/chat.sendMessage';

  public readonly updateMessage = '/app/chat.updateMessage';

  username!: any;
  content!: any;

  received: any[] = [];
  sent: any[] = [];

  wsClient: any;
  connected!: boolean;

  constructor(
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.connect();
  }

  connect() {
    const ws = new SockJS(this.url);
    this.wsClient = Stomp.over(ws);
    const that = this;
    this.received = [];

    this.wsClient.connect({}, function () {
      console.log('Connected!');
      that.connected = true;
      that.wsClient.subscribe(that.topicMessage, (message: { body: any }) => {
        // tslint:disable-next-line:triple-equals
        if (that.username != JSON.parse(message.body).sender) {
          that.received.push(JSON.parse(message.body));
          that.messageService.add({severity: 'info', summary: 'New message from ' + JSON.parse(message.body).sender, detail: JSON.parse(message.body).content});
        }
      });
    });
  }

  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.sent = [];
      this.received = [];
      this.username = null;
      this.content = null;
      console.log('Disconnected!');
      this.wsClient.disconnect();
    }
  }

  sendMessage() {
    const message: any = {
      sender: this.username,
      content: this.content,
      dateTime: new Date()
    };
    this.sent.push(message);
    this.wsClient.send(this.topicChat, {}, JSON.stringify(message));
    this.content = null;
  }

  editMessage(message: any) {
    const updatedMessage: any = {
      id: message.id,
      content: message.content,
      dateTime: new Date()
    };
    this.sent.push(message);
    this.wsClient.send(this.updateMessage, {}, JSON.stringify(updatedMessage));
    this.messageService.add({severity: 'success', summary: 'Message Updated', detail: 'The message has been updated successfully.'});
  }
  
}

