import { TicketsserviceService } from '../../../services/ticketsservice.service';
import { Component ,ElementRef,Renderer2, ViewChild,} from '@angular/core';
import { PokerserviceService } from 'src/app/services/sessionservice/pokerservice.service';
import Swal from 'sweetalert2';
import { VoteChartComponent } from '../vote-chart/vote-chart.component';
import { VoteServiceService } from 'src/app/services/sessionservice/vote-service.service';
import {WebsocketserviceService} from "../../../services/sessionservice/websocketservice.service";
import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {StorageService} from "../../../services/userservice/storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-poker-planning',
  templateUrl: './poker-planning.component.html',
  styleUrls: ['./poker-planning.component.css']
})
export class PokerPlanningComponent {

  TicketList!:any;
  cards:any;
  minutes: number = 5;
  seconds: number = 0;

  initialMinutes: number = 5;
  initialSeconds: number = 0;

  votingStarted: boolean = false;
  intervalId: any;

  participants:any;
  UserStory:any;
  theInput:any;

  selectedCard!: any ;

  ViewChart:Boolean = false;
  @ViewChild(VoteChartComponent) voteChartComponent!: VoteChartComponent;


  receivedMessage!: any;
  receivedMessage2!: any;

  idticket!: any;
  stompClient:any;
  videoadded = false ;

  isLoggedIn = false;
  showAdminBoard = false;
  showDevBoard = false;
  username?: string;
  constructor(private pokerService:PokerserviceService,private websoketService:WebsocketserviceService , private Ticketsservice : TicketsserviceService , private voteservice:VoteServiceService , private storageService: StorageService , private router:Router){ }


  ngOnInit(){
    this.GetTicketsBySession() ;
    this.GetCards() ;
    /*
        const socket = new SockJS('http://localhost:8090/pokerplaning');
        this.stompClient = Stomp.over(socket);
        this.stompClient.connect({}, (frame:any) => {
          console.log("hedha frame" ,frame);
          this.stompClient.subscribe('/topic/session', (result:any) => {
            this.receivedMessage =  JSON.parse(result.body );

            if(this.receivedMessage.votingStarted == false){
              this.closeFromServer();
            } else {

              this.VoteStartServer() ;
            }
          });
        });*/
    if(!this.websoketService.isConnected){
      const socket = new SockJS('http://localhost:8090/pokerplaning');
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, (frame: any) => {
        this.stompClient.subscribe('/topic/session', (result: any) => {
          this.websoketService.isConnected = true;
          this.receivedMessage =  JSON.parse(result.body );
          console.log("hedhy reponsee men pokerr " , result) ;
          if(this.receivedMessage.votingStarted == false){
            this.closeFromServer();
          } else if(this.receivedMessage.votingStarted == true)
          {
            this.VoteStartServer() ;
          }
        });
      });
    }
    else {
      this.receivedMessage =  this.websoketService.getReceivedMessage() ;
      if(this.receivedMessage.votingStarted == false){
        this.closeFromServer();
      } else if(this.receivedMessage.votingStarted == true){
        this.VoteStartServer() ;
      }
    }
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.username = user.username;
      this.participants = user.username ;
    }
  }
  StartVideoConferance(){

    let id =   localStorage.getItem('SessionId') ;
    let nom = "New VideoAdded" ;
    let host = "wiem.khedri50@gmail.com"
    this.pokerService.AddvideoConferance(nom , id , host).subscribe((data:any)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Mail of the New Meet Has Been Sent",
        showConfirmButton: false,
        timer: 1500
      });

    })

  }

  VoteStartServer(){
    let timerInterval: any;
    Swal.fire({
      title: "Vote Started!",
      html: "Start Voting Now",
      timer: 1030,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          const timer = popup.querySelector("b");
          if (timer) {
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          }
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }

    });

    this.votingStarted = this.receivedMessage.votingStarted;


    this.startChronometer();

  }

  GetCards(){
    this.Ticketsservice.GetCarte().subscribe((data:any) => {
      this.cards = data.map((card: any) => card.valeur);
    });
  }
  GetTicketsBySession(){
    this.Ticketsservice.GetBySession(40).subscribe((data)=>{
      this.TicketList = data ;
      console.log(data);
    })
  }

  onVoteStarted() {
    let session={} ;
    this.pokerService.updateSession(session).subscribe((resultat:any)=>{
    })

  }





  startChronometer() {
    const totalTimeInSeconds = this.minutes * 60 + this.seconds;
    let remainingTime = totalTimeInSeconds;

    this.intervalId = setInterval(() => {
      remainingTime--;
      this.minutes = Math.floor(remainingTime / 60);
      this.seconds = remainingTime % 60;

      if (remainingTime <= 0) {
        clearInterval(this.intervalId);
        this.votingStarted = false;
      }
    }, 1000);
  }
  close(){
    let session={} ;
    this.pokerService.updateSessionFalse(session).subscribe(()=>{

    })

  }
  closeFromServer(){

    clearInterval(this.intervalId);
    this.minutes = this.initialMinutes;
    this.seconds = this.initialSeconds;

    let timerInterval: any;
    Swal.fire({
      title: "Vote Ended!",
      html: "You Can't Vote Now",
      timer: 800,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        const popup = Swal.getPopup();
        if (popup) {
          const timer = popup.querySelector("b");
          if (timer) {
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          }
        }
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }

    });
    this.votingStarted = this.receivedMessage.votingStarted;
  }



  onIdTicketReceived(idticket: number) {
    this.idticket = idticket;

    if (this.voteChartComponent) {
      this.voteChartComponent.Idtickets = idticket;

      this.voteChartComponent.GetVoteResults();
    }
    this.ViewChart = true;
  }

  onCardSelected(cardValue: any) {
    if (cardValue != "waiting")
    {
      this.selectedCard = cardValue;
    }
    else{
      alert ("hne valeur" +cardValue)
    }



  }
  commit(){
    console.log("hnee id tickttt" , this.idticket);
    console.log("hnee valeur selctere" , this.selectedCard)
    this.selectedCard = null ;
  }

  handleIdTicket(idTicket: any) {
    this.idticket = idTicket ;

  }

}

