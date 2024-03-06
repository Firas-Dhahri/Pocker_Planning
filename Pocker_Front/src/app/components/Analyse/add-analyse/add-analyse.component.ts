import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnalyseService} from "../../../services/analyseservice/analyse.service";

@Component({
  selector: 'app-add-analyse',
  templateUrl: './add-analyse.component.html',
  styleUrls: ['./add-analyse.component.css']
})
export class AddAnalyseComponent {
  listeTickets: any[] = [
    {idticket:1,assignee_name:"aaa",created:null,description:null,priority_name:null,reporter_name:null,status_name:null,summary:null,updated:null,key:null,self:null,session_id:null,sprint_id_sprint:null,customfield_10016:null,description_field:null,id:null,name:null,self_ticket:null},
    {idticket:2,assignee_name:"aaa",created:null,description:null,priority_name:null,reporter_name:null,status_name:null,summary:null,updated:null,key:null,self:null,session_id:null,sprint_id_sprint:null,customfield_10016:null,description_field:null,id:null,name:null,self_ticket:null},
    {idticket:3,assignee_name:"ccc",created:"2024-02-12T20:57:28.270+0100",description:"Une fonctionnalité exprimée sous la forme d'un objectif utilisateur.",priority_name:"Medium",reporter_name:null,status_name:null,summary:"Architecture physique et logique",updated:"2024-02-18T15:00:22.516+0100",key:"SCRUM-7",self:"https:\/\/firasdhahri.atlassian.net\/rest\/api\/2\/issuetype\/10001",session_id:null,sprint_id_sprint:null,customfield_10016:88,description_field:null,id:10001,name:"Story",self_ticket:"https:\/\/firasdhahri.atlassian.net\/rest\/api\/2\/issue\/10021"},

  ];
  addanalyse!:FormGroup;
  listeProjets: any[] = [
    {id:1, algo:1, budget:1000, contraintes:"TEST1", date_debut:"2023-02-14 17:10:43.000000", date_fin:"2024-02-14 08:10:43.000000", dependance:"dep1", exigences:"equipe", objectif:"projet1", status:"0", titre:"POCKERPLANNING1", equipe_id:null},
    {id:2, algo:1, budget:1000, contraintes:"TEST2", date_debut:"2023-02-14 17:10:43.000000", date_fin:"2024-02-14 08:10:43.000000", dependance:"dep2", exigences:"equipe2", objectif:"projet2", status:"0", titre:"POCKERPLANNING2", equipe_id:null}

  ];
  constructor(private AS:AnalyseService,private fb :FormBuilder) {
  }
  ngOnInit(): void {
    this.addanalyse=this.fb.group({
      type: ['us'],
      description: ['', Validators.required],  // Ajoutez des validateurs si nécessaire
      date_analyse: ['', Validators.required],
      projet: ['', Validators.required],
      ticket: ['', Validators.required]
    });
  }
  Add(){
    let Analyse={

      "date_analyse": this.addanalyse.value.date_analyse,
      "description": this.addanalyse.value.description
    }
    console.log(this.addanalyse.value);
    this.AS.AjouterAnalyse(Analyse,this.addanalyse.value.projet).
    subscribe(()=>{alert("adde Success")
    })}



  add2(){let Analyse={

    "date_analyse": this.addanalyse.value.date_analyse,
    "description": this.addanalyse.value.description
  }
    console.log(this.addanalyse.value);
    this.AS.AjouterAnalyse_us(Analyse,this.addanalyse.value.ticket).
    subscribe(()=>{alert("add Success")
    })
  }


  selectedType: string = 'projet';
  updateTypeSelection() {
    // Mettez à jour la propriété ou effectuez d'autres actions en fonction du type sélectionné
    const typeValue = this.addanalyse.controls['type'].value;
    console.log('Type selectionn" :', typeValue);
    if (typeValue === 'projet') {
      this.selectedType = 'projet';
    } else if (typeValue === 'us') {
      this.selectedType = 'us';
    } else {
      // Gérez d'autres valeurs si nécessaire
      this.selectedType = 'autre';
    }
  }

  isProjetSelected() {
    // Vérifiez si le type sélectionné est "projet"
    return this.addanalyse.controls['type'].value === 'projet';
  }

  isTicketSelected() {
    // Vérifiez si le type sélectionné est "projet"
    return this.addanalyse.controls['type'].value === 'us';
  }
}

