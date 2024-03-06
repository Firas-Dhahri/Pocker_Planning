import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnalyseService} from "../../../services/analyseservice/analyse.service";
import * as XLSX from "xlsx";

@Component({
  selector: 'app-one-analyse',
  templateUrl: './one-analyse.component.html',
  styleUrls: ['./one-analyse.component.css']
})
export class OneAnalyseComponent implements OnInit {


  listeProjets: any[] = [
    {id: 1, algo: 1, budget: 1000, contraintes: "TEST1", date_debut: "2023-02-14 17:10:43.000000", date_fin: "2024-02-14 08:10:43.000000", dependance: "dep1", exigences: "equipe", objectif: "projet1", status: "0", titre: "POCKERPLANNING1", equipe_id: null},
    {id: 2, algo: 1, budget: 1000, contraintes: "TEST2", date_debut: "2023-02-14 17:10:43.000000", date_fin: "2024-02-14 08:10:43.000000", dependance: "dep2", exigences: "equipe2", objectif: "projet2", status: "0", titre: "POCKERPLANNING2", equipe_id: null}
  ];
  id!: any;
  analyse!: any;
  labels1!: string[]; // Déclarer explicitement le type ici
  values1!: number[];
  constructor(private route: ActivatedRoute, private AS: AnalyseService) {
    this.id = this.route.snapshot.params['id'];
  }
  showChart = false;

  ///CHART2

  /////FIN CHARTS 2
  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    exportEnabled: true,
    title: {
      text: "SPRINTS PARS PROJET "
    },
    subtitles: [{
      text: "duree par jours "
    }],
    data: [{
      type: "pie",
      indexLabel: "Sprint num:{name}  duree: {y}J",
      dataPoints: [] as { name: string, y: number }[] // Déclarer le type ici
    }]
  };
  pourcentage:any;
  ngOnInit() { this.AS.getOneAnalyse(this.id).subscribe(
    (data) => {
      // Logique à exécuter une fois que les données sont disponibles
      this.analyse = data;
      console.log('Analyse récupérée :', this.analyse);
      this.AS.Pourcentage_avancement_projet(this.analyse.projet.id).subscribe(
        (pourcentage1: any) => {
          // Assign the value to your variable or perform other actions
          this.pourcentage = pourcentage1;
          console.log('ellie :'+this.id+'ellie2:'+this.analyse.projet.id)
        },
        (error) => {
          // Handle errors if necessary
          console.error('Error fetching pourcentage:', error);
        }
      );
    });
    // Appel du service pour récupérer l'analyse avec l'ID spécifié
    this.AS.getOneAnalyse(this.id).subscribe(
      (data) => {
        // Logique à exécuter une fois que les données sont disponibles
        this.analyse = data;
        console.log('Analyse récupérée :', this.analyse);
      },
      (error) => {
        // Gérer les erreurs, si nécessaire
        console.error('Erreur lors de la récupération de l\'analyse :', error);
      }
    );

    this.AS.getOneAnalyse(this.id).subscribe(
      (data) => {
        // Logique à exécuter une fois que les données sont disponibles
        this.analyse = data;
        console.log('Analyse récupérée99 :', this.analyse);
        this.AS.getSprint_par_Projet(this.analyse.projet.id).subscribe(
          (data) => {
            this.labels1 = Object.keys(data);
            console.log('lana:'+this.labels1);
            const values1 = Object.values(data);
///

            // Vérifier si this.chartOptions.data[0] existe
            if (this.chartOptions.data[0]) {
              this.chartOptions.data[0].dataPoints = this.labels1.map((label, index) => ({
                name: label,
                y: values1[index],
              }));

            } else {
              console.error('La propriété "data[0]" de chartOptions est undefined.');
            }

            // La sortie suivante sera exécutée avant que les données ne soient reçues
            console.log('Appel du service en cours...');
          },
          (error) => {
            console.error('Erreur lors de la récupération des données :', error);
          }
        );});

  }



  add2Clicked(){
    this.showChart = !this.showChart;

    this.chartOptions;
    console.log('wiwi :', this.labels1);
  }


  //sprints en retard
  showretard = false;
  listAnalyse1!:any;
  sprints_retard() {
    this.showretard = !this.showretard;

    if (this.showretard) {
      this.AS.getsprint_retard(this.analyse.projet.id).subscribe(
        data1 => {
          console.log('Données retard:', this.analyse.projet.id);
          this.listAnalyse1 = data1;
        },
        error => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }
  }
  showcours = false;
  sprints_en_cours() {
    this.showcours = !this.showcours;
    if (this.showcours) {
      this.AS.getSprint_en_cours(this.analyse.projet.id).subscribe(
        data_cours => {
          console.log('Données en cours:', this.analyse.projet.id);
          this.listAnalyse1 = data_cours;
        },
        error => {
          console.error('Erreur lors de la récupération des données:', error);
        }
      );
    }
  }

  exportexcel(): void {
    const data: any[] = [];

    // Ajoutez chaque détail dans le tableau
    data.push(['Description', this.analyse.description]);
    data.push(['Date d\'Analyse', this.analyse.date_analyse]);
    data.push(['Projet', this.analyse.projet.titre]);
    data.push(['Sprints', this.analyse.projet.sprints.titre]);


    // Ajoutez d'autres détails au besoin

    // Créez un nouveau classeur
    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Ajoutez des styles à la feuille de calcul

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Sauvegardez le fichier Excel
    XLSX.writeFile(wb, 'exported_data.xlsx');
  }

}
