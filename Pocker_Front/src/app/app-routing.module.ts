import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PokerPlanningComponent } from './components/Session/poker-planning/poker-planning.component';
import { AddSessionComponent } from './components/Session/add-session/add-session.component';
import { ChronometerComponent } from './components/Session/chronometer/chronometer.component';
import { VoteChartComponent } from './components/Session/vote-chart/vote-chart.component';
import {MessageComponent} from "./components/Forum/message/message.component";
import {LoginComponent} from "./components/user/login/login.component";
import {RegisterComponent} from "./components/user/register/register.component";



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

  ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
