import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
// @ts-ignore
import SockJS from 'sockjs-client/dist/sockjs';
import { MessageService } from 'primeng/api';
import { MessageserviceService } from "../../services/messageservice.service";
// @ts-ignore
import * as Filter from 'bad-words';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageserviceService]
})
export class MessageComponent implements OnInit {

  public readonly url = 'http://localhost:8090/Poker/pokerplaning';
  public readonly topicMessage = '/topic/public';
  public readonly topicChat = '/app/chat.sendMessage';

  username!: string;
  content!: string;

  messageSent = false;
  received: any[] = [];

  sent: any[] = [];
  wsClient: any;

  connected = false;

  colors: string[] = ['aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure', 'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood', 'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkgrey', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow', 'grey', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightgrey', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite', 'navy', 'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru', 'pink', 'plum', 'powderblue', 'purple', 'rebeccapurple', 'red', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'wheat', 'white', 'whitesmoke', 'yellow', 'yellowgreen'];

  searchTerm = '';
  filteredMessages: any[] = [];

  replyContent: string = '';

  text!: string;
  recording = false;

  technology = 0;
  effort = 0;
  codeComplexity = 0;
  dependencies = 0;

  showInputFields = true;

  wordFilter: any;

  recordingReply = false;

  constructor(private messageService: MessageService, public MsgService: MessageserviceService) {
    this.MsgService.init();
    this.wordFilter = new Filter();
    this.MsgService.recordingFinished.subscribe((recordedContent: string) => {
      this.content += recordedContent;
    });
    this.MsgService.recordingReplyFinished.subscribe((recordedReplyContent: string) => {
      this.replyContent += recordedReplyContent;
    });
  }

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
    }, (error: any) => {
      console.error('Error during connection:', error);
    });
  }

  sendMessage() {
    if (!this.messageSent || !this.content || !this.content.trim()) {
      const isContentProfane = this.wordFilter.isProfane(this.content);
      if (isContentProfane) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Message contains inappropriate words !!!!'
        });
        return;
      } else {
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Message sent successfully '});
      }
      const message = {
        sender: this.username,
        content: this.content,
        dateTime: new Date(),
        technology: this.technology,
        effort: this.effort,
        codeComplexity: this.codeComplexity,
        dependencies: this.dependencies
      };
      this.messageSent = true;
      const that = this;
      this.wsClient.send(this.topicChat, {}, JSON.stringify(message), function (response: any) {
        const parsedResponse = JSON.parse(response.body);
        console.log("Response received from server:", parsedResponse);
      });
      if (this.recording) {
        this.stopRecording();
      }
      this.content = '';
      this.technology = 0;
      this.effort = 0;
      this.codeComplexity = 0;
      this.dependencies = 0;
      this.showInputFields = false;
    }
  }

  allMessagesSortedByTime(): any[] {
    const allMessages = [...this.sent, ...this.received];
    return allMessages.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
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

  sendReply(id: any, toReciever:string) {
    const replyContent = this.replyContent.trim() !== '' ? this.replyContent : this.MsgService.replyText;
    if (replyContent.trim() !== '') {
      const isContentProfane = this.wordFilter.isProfane(replyContent);
      if (isContentProfane) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Reply contains inappropriate words!' });
        return;
      } else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Reply sent successfully' });
      }
      const payload = {
        id: id,
        fromSender: this.username,
        toReciever: toReciever,
        reply: {
          content: replyContent,
          dateTime: new Date()
        }
      };
      this.wsClient.send('/app/chat.sendReply', {}, JSON.stringify(payload), (response: any) => {
        const parsedResponse = JSON.parse(response.body);
        console.log("Response received from server:", parsedResponse);
      }, (error: any) => {
        console.error('Error while sending reply:', error);
      });
      if (this.recordingReply) {
        this.stopRecordingReply();
      }
      this.replyContent = '';
      this.MsgService.replyText = '';
    }
  }

  startRecording() {
    this.recording = true;
    this.MsgService.startService();
  }

  stopRecording() {
    this.recording = false;
    this.content += this.MsgService.text;
    this.MsgService.text = '';
    this.MsgService.stopService();
  }

  startRecordingReply() {
    this.recordingReply = true;
    this.MsgService.startReplyService();
  }

  stopRecordingReply() {
    this.recordingReply = false;
    this.replyContent += this.MsgService.replyText;
    this.MsgService.replyText = '';
    this.MsgService.stopReplyService();
  }

  speakMessage(messageContent: string): void {
    this.MsgService.speak(messageContent);
  }

}
