import { Component } from '@angular/core';
import { PokerPlanningComponent } from '../poker-planning/poker-planning.component';
import { PokerserviceService } from 'src/app/services/sessionservice/pokerservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {StorageService} from "../../../services/userservice/storage.service";
import {WebsocketserviceService} from "../../../services/sessionservice/websocketservice.service";


@Component({
  selector: 'app-add-sessionservice',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent {
  stompClient:any;
  receivedMessage:any ;
  isLoggedIn = false;
  currentUser:any ;
  Session={

  } ;
  constructor(private pokerservice:PokerserviceService , private router:Router ,    private storageService: StorageService , private webSocketService:WebsocketserviceService ){
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.currentUser = this.storageService.getUser();

  }

ngOnInit(){

 /*   const socket = new SockJS('http://localhost:8090/pokerplaning');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {

      this.stompClient.subscribe('/topic/session', (result: any) => {
        this.webSocketService.isConnected == true;
        console.log("hedhy reponsee m add session" , result)
      });
    });*/
  if (!this.webSocketService.stompClient) {
    const socket = new SockJS('http://localhost:8090/pokerplaning');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame: any) => {
      this.webSocketService.isConnected = true;
      this.stompClient.subscribe('/topic/session', (result: any) => {
        const message = JSON.parse(result.body);

        this.receivedMessage = message ;
        console.log("hedhy resultats m add" , message) ;
        this.pokerservice.setSessionId(message.id);
        localStorage.setItem('receivedMessageId', this.receivedMessage.id);
        localStorage.setItem('SessionId', this.receivedMessage.id);
      });
    });
  }

}




  AddSession(){
    this.pokerservice.addSession(this.Session).subscribe(
      (response) =>{
        Swal.fire({
          title: "Added Succesfully",
          text: "You Added A New Session!",
          icon: "success"
        });

  // this.pokerservice.connect();


       this.router.navigateByUrl('/navbar/chronometre');

      } , (errot)=>{
        Swal.fire({
          icon: "error",
          title: "error...",
          text: "Error While Adding A Session!",

        });

      });
  }
AddSession1() {
  // console.log("u clicked here");
  // const message = {
  //   destination: "createSession",
  //   payload: this.Session
  // };

  // this.pokerservice.sendMessage2(message).subscribe((res) => {
  //   console.log("ressses", res);


  // } ,  (error)=>{
  //     console.log("errrorrr")
  // });
  // console.log("teb3a thhhh");



    const message ={
      session :this.AddSession
    }




}
  }

