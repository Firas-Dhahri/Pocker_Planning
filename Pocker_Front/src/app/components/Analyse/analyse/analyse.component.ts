import {Component, Input} from '@angular/core';
import {Analyse} from "../../../Models/Analyse";
import {AnalyseService} from "../../../services/analyseservice/analyse.service";

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css']
})
export class AnalyseComponent {

  listAnalyse!:any;
  @Input()p!:Analyse;

  constructor(private AS:AnalyseService){}
  ngOnInit() {
    /*  this.AS.getAll().subscribe(data => {
        console.log('Données récupérées1:', data);
        this.listAnalyse = data;
      }, error => {
        console.error('Erreur lors de la récupération des données:', error);
      });

    }*/
  }

  delete(i: number) {
    this.AS.Supprimer_Analyse(i).subscribe(
      () => this.listAnalyse = this.listAnalyse.filter((analyse: Analyse) => analyse.id !== i))
  }




}
