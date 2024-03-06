import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/Session/card/card.component';
import { PokerPlanningComponent } from './components/Session/poker-planning/poker-planning.component';
import { PbiTitleComponent } from './components/Session/pbi-title/pbi-title.component';
import { RowComponent } from './components/Session/row/row.component';
import { ParticipantsComponent } from './components/Session/participants/participants.component';
import { AddSessionComponent } from './components/Session/add-session/add-session.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChronometerComponent } from './components/Session/chronometer/chronometer.component';
import { VoteChartComponent } from './components/Session/vote-chart/vote-chart.component';
import { MessageComponent } from './components/Forum/message/message.component';
import { MetricComponent } from './components/Forum/metric/metric.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";
import { LoginComponent } from './components/user/login/login.component';
import {RegisterComponent} from "./components/user/register/register.component";
import { ProfileComponent } from './components/user/profile/profile.component';
import { AddAnalyseComponent } from './components/Analyse/add-analyse/add-analyse.component';
import { AnalyseProjetComponent } from './components/Analyse/analyse-projet/analyse-projet.component';
import { AnalyseUsComponent } from './components/Analyse/analyse-us/analyse-us.component';
import { AnalyseComponent } from './components/Analyse/analyse/analyse.component';
import { OneAnalyseComponent } from './components/Analyse/one-analyse/one-analyse.component';
import { OneAnalyseTicketComponent } from './components/Analyse/one-analyse-ticket/one-analyse-ticket.component';
import {NgChartsModule} from "ng2-charts";
import {NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";
import {CanvasJSAngularChartsModule} from "@canvasjs/angular-charts";




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardComponent,
    PokerPlanningComponent,
    PbiTitleComponent,
    RowComponent,
    ParticipantsComponent,
    AddSessionComponent,
    ChronometerComponent,
    VoteChartComponent,
    MessageComponent,
    MetricComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    AddAnalyseComponent,
    AnalyseProjetComponent,
    AnalyseUsComponent,
    AnalyseComponent,
    OneAnalyseComponent,
    OneAnalyseTicketComponent




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    NgChartsModule,
    NgbProgressbar,
    FormsModule,
      CanvasJSAngularChartsModule,



  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
