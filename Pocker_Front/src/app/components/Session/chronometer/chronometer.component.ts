import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PokerserviceService } from 'src/app/services/sessionservice/pokerservice.service';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {WebsocketserviceService} from "../../../services/sessionservice/websocketservice.service";

@Component({
  selector: 'app-chronometer',
  templateUrl: './chronometer.component.html',
  styleUrls: ['./chronometer.component.css']
})
export class ChronometerComponent implements OnInit, OnDestroy {
  remainingTime: any;
  timerInterval: any;
  sessionId!:any;

  stompClient:any;
  receivedMessage:any ;
  constructor(private pokerService: PokerserviceService , private router: Router , private route: ActivatedRoute , private webSocketService:WebsocketserviceService ) {}

  ngOnInit(): void {
    const storedMessageId = localStorage.getItem('receivedMessageId');
    if (storedMessageId) {
      this.receivedMessage = { id: storedMessageId }; // Restore received message ID
      this.GetRemainingTime(storedMessageId);
    }


    if(!this.webSocketService.isConnected){
      const socket = new SockJS('http://localhost:8090/pokerplaning');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: any) => {

        this.stompClient.subscribe('/topic/session', (result: any) => {
          this.webSocketService.isConnected = true;
          console.log("hedhy reponsee" , result)
          this.receivedMessage =  JSON.parse(result.body );
          console.log("hedhy reponsee men chronometre " , this.receivedMessage) ;
          localStorage.setItem('receivedMessageId', this.receivedMessage.id);
          this.GetRemainingTime(this.receivedMessage.id) ;
        });
      });
    }
    else {
      this.receivedMessage =  this.webSocketService.getReceivedMessage() ;
      localStorage.setItem('receivedMessageId', this.receivedMessage.id);
      this.GetRemainingTime(this.receivedMessage.id) ;
    }
  }

GetRemainingTime(response:any){
    this.pokerService.getRemainingTimeForSession(response).subscribe((data)=>{
      this.remainingTime = data;
      this.startTimer();
    })
}

  startTimer() {
    if (this.remainingTime && this.remainingTime.hours !== undefined && this.remainingTime.minutes !== undefined && this.remainingTime.seconds !== undefined) {
      let remainingSeconds = this.remainingTime.hours * 3600 + this.remainingTime.minutes * 60 + this.remainingTime.seconds;

      this.timerInterval = setInterval(() => {
        if (remainingSeconds <= 0) {
          clearInterval(this.timerInterval);
          localStorage.removeItem('receivedMessageId');
          this.router.navigateByUrl('/navbar/poker');
        } else {
          remainingSeconds--;
          this.remainingTime = {
            hours: Math.floor(remainingSeconds / 3600),
            minutes: Math.floor((remainingSeconds % 3600) / 60),
            seconds: remainingSeconds % 60
          };
        }
      }, 1000);
    }
  }


  formatTime(time: number): string {
    return time < 10 ? `0${time}` : `${time}`;
  }

  ngOnDestroy(): void {
    clearInterval(this.timerInterval);
  }
}
