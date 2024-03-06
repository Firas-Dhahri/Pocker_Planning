import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokerPlanningComponent } from './components/Session/poker-planning/poker-planning.component';
import { AddSessionComponent } from './components/Session/add-session/add-session.component';
import { ChronometerComponent } from './components/Session/chronometer/chronometer.component';
import { VoteChartComponent } from './components/Session/vote-chart/vote-chart.component';
import {MessageComponent} from "./components/Forum/message/message.component";
import {LoginComponent} from "./components/User/login/login.component";
import {RegisterComponent} from "./components/User/register/register.component";
import {OneAnalyseTicketComponent} from "./components/Analyse/one-analyse-ticket/one-analyse-ticket.component";
import {AnalyseComponent} from "./components/Analyse/analyse/analyse.component";
import {AnalyseProjetComponent} from "./components/Analyse/analyse-projet/analyse-projet.component";
import {AnalyseUsComponent} from "./components/Analyse/analyse-us/analyse-us.component";
import {AddAnalyseComponent} from "./components/Analyse/add-analyse/add-analyse.component";
import {OneAnalyseComponent} from "./components/Analyse/one-analyse/one-analyse.component";
import {AfficherTicketComponent} from "./components/ticket/afficher-ticket/afficher-ticket.component";
import {AjouterticketComponent} from "./components/ticket/ajouterticket/ajouterticket.component";
import {UpdateticketComponent} from "./components/ticket/updateticket/updateticket.component";



const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full' } ,
  { path: 'login', component: LoginComponent } ,
  { path: 'registre', component: RegisterComponent },
  { path: 'profile', component: RegisterComponent },
  {path:'navbar' , component:NavbarComponent , children:[
    {path:'addsession' , component:AddSessionComponent} ,
    {path:'poker' , component:PokerPlanningComponent} ,
    {path:'chronometre' , component:ChronometerComponent} ,
    {path:'votechart' , component:VoteChartComponent} ,
      {path:'message' , component:MessageComponent},
      //TIcket
      { path: 'affichertickets', component: AfficherTicketComponent },
      { path: 'ajouterticket', component: AjouterticketComponent },
      { path: 'updateticket/:issueKey', component: UpdateticketComponent },
        //partie analyse
      { path: 'analyse_Us/one_ticket/:id', component:OneAnalyseTicketComponent },
      { path: 'analyse',component:AnalyseComponent },
      { path: 'analyse_Projet',component:AnalyseProjetComponent},
      { path: 'analyse_Us',component:AnalyseUsComponent },
      { path: 'add_analyse',component:AddAnalyseComponent },
      { path: 'analyse_Projet/one_analyse/:id', component: OneAnalyseComponent},




  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
