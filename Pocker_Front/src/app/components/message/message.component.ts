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
  messageSent: any;

  received: any[] = [];
  sent: any[] = [];

  wsClient: any;
  connected!: boolean;

  colors: string[] = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond',
    'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
    'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey',
    'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen',
    'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue',
    'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
    'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory',
    'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow',
    'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey',
    'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid',
    'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
    'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered',
    'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink',
    'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown',
    'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen',
    'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow',
    'yellowgreen'
  ];

  searchTerm: string = '';
  filteredMessages: any[] = [];

  replyContent: string = '';

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.connect();
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
        if (that.username !== parsedMessage.sender) {
          that.received.push(parsedMessage);
          that.messageService.add({
            severity: 'info',
            summary: 'New message from ' + parsedMessage.sender,
            detail: parsedMessage.content
          });
        } else {
          if (that.messageSent) {
            that.sent.push(parsedMessage);
            that.messageSent = false;
          }
        }
      });
    });
  }

  sendMessage() {
    if (this.content.trim() !== '') {
      const message = {
        sender: this.username,
        content: this.content,
        dateTime: new Date()
      };
      this.messageSent = true;
      const that = this;
      this.wsClient.send(this.topicChat, {}, JSON.stringify(message), function (response: any) {
        const parsedResponse = JSON.parse(response.body);
        console.log("Response received from server:", parsedResponse);
      });
      this.content = '';
    }
  }

  allMessagesSortedByTime(): any[] {
    const allMessages = [...this.sent, ...this.received];
    return allMessages.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
  }

  editMessage(message: any) {
    const newContent = prompt('Type the new message :', message.content);
    if (newContent !== null && newContent.trim() !== '') {
      const updatedMessage = {
        id: message.id,
        content: newContent,
        sender: message.sender,
        dateTime: new Date()
      };
      const index = this.sent.findIndex((m: any) => m.id === updatedMessage.id);
      if (index !== -1) {
        this.sent[index] = updatedMessage; // Remplacer le message dans la liste sent par le message mis à jour
      }
      this.wsClient.send(this.updateMessage, {}, JSON.stringify(updatedMessage));
      this.messageService.add({severity: 'info', summary: 'Message updated', detail: 'Message updated successfully.'});
    }
  }

  getAvatarColor(sender: string): string {
    if (sender && sender.trim() !== '') {
      let hash = 0;
      for (let i = 0; i < sender.length; i++) {
        hash = 31 * hash + sender.charCodeAt(i);
      }
      const index = Math.abs(hash % this.colors.length);
      return this.colors[index];
    } else {
      return 'lightgray';
    }
  }

  searchMessages(): void {
    if (this.searchTerm.trim() !== '') {
      this.filteredMessages = this.allMessagesSortedByTime().filter(message => {
        return message.content.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          message.sender.toLowerCase().includes(this.searchTerm.toLowerCase());
      });
    } else {
      this.filteredMessages = [];
    }
  }

  sendReply(id: any) {
    if (this.replyContent.trim() !== '') {
      const payload = {
        id: id,
        reply: {
          content: this.replyContent,
          dateTime: new Date()
        }
      };
      this.wsClient.send('/app/chat.sendReply', {}, JSON.stringify(payload), (response: any) => {
        const parsedResponse = JSON.parse(response.body);
        console.log("Response received from server:", parsedResponse);
        const messageToUpdate = this.received.find(message => message.id === id);
        if (messageToUpdate) {
          if (!messageToUpdate.replies) {
            messageToUpdate.replies = [];
          }
          messageToUpdate.replies.push(parsedResponse.reply);
        }
      });
      this.replyContent = '';
    }
  }

}
