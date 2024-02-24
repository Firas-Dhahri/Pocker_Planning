import { Component, OnInit } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})

export class MessageComponent {

  messages: Message[] = [];
  newMessage: Message = { id: 0, content: '', sender: '', dateTime: new Date() };

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageService.getMessage().subscribe((message: Message) => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    this.messageService.sendMessage(this.newMessage);
    this.newMessage = { id: 0, content: '', sender: '', dateTime: new Date() };
    //this.newMessage.content = ''; // Clear input after sending
  }

}
  