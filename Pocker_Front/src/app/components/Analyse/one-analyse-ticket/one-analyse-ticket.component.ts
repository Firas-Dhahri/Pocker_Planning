import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnalyseService} from "../../../services/analyseservice/analyse.service";

@Component({
  selector: 'app-one-analyse-ticket',
  templateUrl: './one-analyse-ticket.component.html',
  styleUrls: ['./one-analyse-ticket.component.css']
})
export class OneAnalyseTicketComponent {

  id!: any;
  ticket!:any;
  constructor(private route: ActivatedRoute, private AS: AnalyseService) {
    this.id = this.route.snapshot.params['id'];
  }
  ngOnInit() {
    this.AS.getOne_ticket(this.id).subscribe(
      data1 => {
        console.log('Données retard:', this.ticket);
        this.ticket = data1;
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );

  }


}
