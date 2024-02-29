import { Component } from '@angular/core';
import { PokerPlanningComponent } from '../poker-planning/poker-planning.component';
import { PokerserviceService } from 'src/app/services/pokerservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css']
})
export class AddSessionComponent {

  Session={

  } ;
  constructor(private pokerservice:PokerserviceService , private router:Router){

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
        this.pokerservice.setSessionId(response.id);
       this.router.navigate(['/chronomoetre']);


      } , (errot)=>{
        Swal.fire({
          icon: "error",
          title: "error...",
          text: "Error While Adding A Session!",

        });

      });
  }


// console.log("u clicked here") ;
//   this.pokerservice.sendMessage2("/createSession" , this.Session).subscribe((res)=>{
//     console.log("res" )
//   })
//   console.log("teb3a  thhhh") ;
//   }




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

