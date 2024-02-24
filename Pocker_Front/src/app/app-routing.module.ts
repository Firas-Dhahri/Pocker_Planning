import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AfficherTicketrComponent } from './components/afficher-ticket/afficher-ticketr.component';
import { AjouterticketComponent } from './components/ajouterticket/ajouterticket.component';
import { UpdateticketComponent } from './components/updateticket/updateticket.component';
import { MessageComponent } from './components/message/message.component';

const routes: Routes = [
  {path:'' , component:NavbarComponent , children:[
  { path: 'affichertickets', component: AfficherTicketrComponent },
  { path: 'ajouterticket', component: AjouterticketComponent }, 
  { path: 'updateticket/:issueKey', component: UpdateticketComponent }, 
  { path: 'app-message' , component:MessageComponent },

    

  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
