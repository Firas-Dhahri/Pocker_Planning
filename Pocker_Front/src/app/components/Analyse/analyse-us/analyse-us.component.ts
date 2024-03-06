import { Component } from '@angular/core';
import {AnalyseService} from "../../../services/analyseservice/analyse.service";
import {Analyse} from "../../../Models/Analyse";

@Component({
  selector: 'app-analyse-us',
  templateUrl: './analyse-us.component.html',
  styleUrls: ['./analyse-us.component.css']
})
export class AnalyseUsComponent {

  listAnalyse1!:any;

  constructor(private AS:AnalyseService){}
  /*
  ngOnInit(){
  this.AS.getAll().subscribe(
   { next:(data)=>this.listAnalyse=data }
  );}*/
  ngOnInit() {
    this.AS.getAnalyse_par_Us().subscribe(data => {
      console.log('Données récupérées1:', data);
      this.listAnalyse1 = data;
    }, error => {
      console.error('Erreur lors de la récupération des données:', error);
    });

  }

  delete(i: number) {
    this.AS.Supprimer_Analyse(i).subscribe(
      () => this.listAnalyse1 = this.listAnalyse1.filter((analyse: Analyse) => analyse.id !== i))
  }
}
