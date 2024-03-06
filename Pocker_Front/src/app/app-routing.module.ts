import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'
import { NavbarComponent } from './components/navbar/navbar.component';
import { AfficherTicketrComponent } from './components/afficher-ticket/afficher-ticketr.component';
import { AjouterticketComponent } from './components/ajouterticket/ajouterticket.component';
import { UpdateticketComponent } from './components/updateticket/updateticket.component';
import {AfficherCarteComponent } from './components/gestionProjets/afficher-carte/afficher-carte.component';
import {AjouterCarteComponent } from './components/gestionProjets/ajouter-carte/ajouter-carte.component';
import {UpdateCarteComponent } from './components/gestionProjets/update-carte/update-carte.component';

import {AfficherProjetComponent } from './components/gestionProjets/afficher-projet/afficher-projet.component';
import {AjouterProjetComponent } from './components/gestionProjets/ajouter-projet/ajouter-projet.component';
import { UpdateProjetComponent } from './components/gestionProjets/update-projet/update-projet.component';
import { ShowProjetComponent } from './components/gestionProjets/show-projet/show-projet.component';


const routes: Routes = [
  {path:'' , component:NavbarComponent , children:[
  { path: 'affichertickets', component: AfficherTicketrComponent },
  { path: 'ajouterticket', component: AjouterticketComponent }, 
  { path: 'updateticket/:issueKey', component: UpdateticketComponent },
  { path: 'affichercarte', component: AfficherCarteComponent },
  { path: 'ajoutercarte', component: AjouterCarteComponent },
  { path: 'updatecarte', component: UpdateCarteComponent },    
  { path: 'afficherprojet', component: AfficherProjetComponent },
  { path: 'ajouterprojet', component: AjouterProjetComponent },    
  { path: 'updateprojet', component: UpdateProjetComponent },    
  { path: 'showprojet/:projetId', component: ShowProjetComponent },    


  ]},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
