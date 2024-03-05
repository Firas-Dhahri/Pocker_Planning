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

  constructor(private messageService: MessageService) {
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
        const parsedMessage = JSON.parse(message.body);
        if (that.username != parsedMessage.sender) {
          that.received.push(parsedMessage);
          that.messageService.add({severity: 'info', summary: 'New message from ' + parsedMessage.sender, detail: parsedMessage.content});
        }
      });
    });
  }

  disconnect() {
    if (this.connected) {
      this.connected = false;
      this.sent = [];
      this.received = [];
      this.username = '';
      this.content = '';
      console.log('Disconnected!');
      this.wsClient.disconnect();
    }
  }

  sendMessage() {
    if (this.content.trim() !== '') {
      const message = {
        sender: this.username,
        content: this.content,
        dateTime: new Date()
      };
      this.sent.push(message);
      this.wsClient.send(this.topicChat, {}, JSON.stringify(message));
      this.content = '';
    }
  }

  allMessagesSortedByTime(): any[] {
    const allMessages = [...this.sent, ...this.received];
    return allMessages.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }
/*
  editMessage(message: any) {
    const newContent = prompt('Entrez le nouveau contenu du message :', message.content);
    if (newContent !== null && newContent.trim() !== '') {
      const updatedMessage = {
        id: message.id,
        content: newContent,
        dateTime: new Date()
      };
      this.sent.push(updatedMessage);
      this.wsClient.send(this.updateMessage, {}, JSON.stringify(updatedMessage));
      this.messageService.add({severity: 'success', summary: 'Message Updated', detail: 'The message has been updated successfully.'});
    }
  }

  editMessage(message: any) {
    const newContent = prompt('Entrez le nouveau contenu du message :', message.content);
    if (newContent !== null && newContent.trim() !== '') {
      const updatedMessage = {
        id: message.id,
        content: newContent,
        sender: message.sender, // Ajouter le sender d'origine au message mis à jour
        dateTime: new Date()
      };
      const index = this.sent.findIndex(m => m.id === updatedMessage.id);
      if (index !== -1) {
        this.sent[index].content = updatedMessage.content; // Mettre à jour le contenu dans la liste sent
        this.sent[index].dateTime = updatedMessage.dateTime; // Mettre à jour la date-heure dans la liste sent
      }
      this.wsClient.send(this.updateMessage, {}, JSON.stringify(updatedMessage));
      this.messageService.add({severity: 'success', summary: 'Message Updated', detail: 'Le message a été mis à jour avec succès.'});
    }
  }
*/



}

