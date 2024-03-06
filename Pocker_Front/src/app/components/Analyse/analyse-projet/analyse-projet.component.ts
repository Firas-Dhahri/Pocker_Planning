import { Component } from '@angular/core';
import {AnalyseService} from "../../../services/analyseservice/analyse.service";
import {Analyse} from "../../../Models/Analyse";

@Component({
  selector: 'app-analyse-projet',
  templateUrl: './analyse-projet.component.html',
  styleUrls: ['./analyse-projet.component.css']
})
export class AnalyseProjetComponent {
//khalil 16h56
  listAnalyse!:any;

  constructor(private AS:AnalyseService){}
  ngOnInit() {
    this.AS.getAnalyse_par_projet().subscribe(
      (data: any) => {
        console.log("data", data);
        this.listAnalyse = data;
      },
      (error: any) => {
        console.error("Une erreur s'est produite lors de la récupération des données :", error);
        // Vous pouvez ajouter une logique de gestion d'erreur supplémentaire ici si nécessaire
      }
    );
  }





  delete(i: number) {
    this.AS.Supprimer_Analyse(i).subscribe(
      () => this.listAnalyse = this.listAnalyse.filter((analyse: Analyse) => analyse.id !== i))
  }
}
