import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AnalyseService } from "../../../services/analyseservice/analyse.service";

@Component({
  selector: 'app-one-analyse-ticket',
  templateUrl: './one-analyse-ticket.component.html',
  styleUrls: ['./one-analyse-ticket.component.css']
})
export class OneAnalyseTicketComponent implements OnInit {

  id: any;
  ticket: any;
  analyse: any;
  labels1: string[] = [];
  values1: number[] = [];
  listUsers:any;

  constructor(private route: ActivatedRoute, private AS: AnalyseService) {
    this.id = this.route.snapshot.params['id'];
  }

chartOptions = {
    title: {
      text: 'Monthly Tickets WORKED',
    },
    theme: 'light2',
    animationEnabled: true,
    exportEnabled: true,
  /*  axisY: {
      includeZero: true,
      valueFormatString: '$#,##0k',
    },*/
    data: [
      {
        type: 'column',
        color: '#5f76e8',
        indexLabel: "{y} us pendant le mois {name}",
        dataPoints: [] as { name: string, y: number }[]
      },
    ],
  };
  chartOptions2 = {
    theme: "dark2",
    animationEnabled: true,
    zoomEnabled: true,
    title: {
      text: "Evolution d'un User"
    },
    axisY: {

    },
    data: [{
      type: "line",
      yValueFormatString: "#,###.##",
      dataPoints: [] as { name: String, y: number }[] // Déclarer le type ici

    }]
  }
  ngOnInit() {
//this.chartOptions2;
    this.AS.getOneAnalyse(this.id).subscribe(
      (data) => {
        this.analyse = data;
        console.log('Analyse récupérée :', this.analyse);

        this.AS.getticket_par_mois(1).subscribe(
          (data) => {
            this.labels1 = Object.keys(data);
            const values1 = Object.values(data);

            if (this.chartOptions.data[0]) {
              this.chartOptions.data[0].dataPoints = this.labels1.map((label, index) => ({
                name: label,
                y: values1[index],
              }));
            } else {
              console.error('La propriété "data[0]" de chartOptions est undefined.');
            }

            console.log('Tickets par mois :', this.labels1, this.values1);
          },
          (error) => {
            console.error('Erreur lors de la récupération des données :', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails de l\'analyse :', error);
      }
    );

    this.AS.getOne_ticket(this.id).subscribe(
      (data) => {
        this.ticket = data;
        console.log('Détails du ticket récupérés :', this.ticket);
      },
      (error) => {
        console.error('Erreur lors de la récupération des détails du ticket :', error);
      }
    );
  }


  Affection_ticket_dev(){


      this.AS.Proposition_affectation(2).subscribe(
        data1 => {

          this.listUsers = data1;
        },
        error => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );

  }

  evolution_equipe(){
    this.AS.evolutionComplexiteUtilisateur(1).subscribe(
      data1 => {
        this.labels1=Object.keys(data1);
        const values1 = Object.values(data1);
        this.chartOptions2.data[0].dataPoints = this.labels1.map((label, index) => ({
          name: label,
          y: values1[index],
        }));
      },
      error => {
        console.error('Erreur lors de la récupération des données:', error);
      }
    );
  }
}
