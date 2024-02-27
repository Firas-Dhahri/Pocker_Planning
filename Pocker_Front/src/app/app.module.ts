import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CardComponent } from './components/card/card.component';
import { PokerPlanningComponent } from './components/poker-planning/poker-planning.component';
import { PbiTitleComponent } from './components/pbi-title/pbi-title.component';
import { RowComponent } from './components/row/row.component';
import { ParticipantsComponent } from './components/participants/participants.component';
import { AddSessionComponent } from './components/add-session/add-session.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChronometerComponent } from './components/chronometer/chronometer.component';
import { VoteChartComponent } from './components/vote-chart/vote-chart.component';
import { MessageComponent } from './components/message/message.component';
import { MetricComponent } from './components/metric/metric.component';
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ButtonModule} from "primeng/button";


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



  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    HttpClientModule, ReactiveFormsModule, FormsModule, ToastModule,
    BrowserAnimationsModule, ButtonModule,


  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
