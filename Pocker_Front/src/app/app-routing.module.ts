import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AfficherTicketrComponent } from './components/afficher-ticket/afficher-ticketr.component';
import { AjouterticketComponent } from './components/ajouterticket/ajouterticket.component';
import { UpdateticketComponent } from './components/updateticket/updateticket.component';
import { ReclamationComponent} from './components/reclamation/reclamation.component';
import { AddReclamationComponent } from './components/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './components/update-reclamation/update-reclamation.component';
import { DeleteReclamationComponent } from './components/delete-reclamation/delete-reclamation.component';
import { DetailsreclamationComponent } from './components/detailsreclamation/detailsreclamation.component';
const routes: Routes = [
  {path:'' , component:NavbarComponent , children:[
  { path: 'affichertickets', component: AfficherTicketrComponent },
  { path: 'ajouterticket', component: AjouterticketComponent }, 
  { path: 'updateticket/:issueKey', component: UpdateticketComponent }, 
  { path: 'reclamations', component: ReclamationComponent },
  { path: 'add-reclamation', component: AddReclamationComponent },
  { path: 'update-reclamation/:id', component: UpdateReclamationComponent },
  { path: 'delete-reclamation/:id', component: DeleteReclamationComponent },
  { path: 'detailsreclamation/:id', component: DetailsreclamationComponent },
  
    

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
