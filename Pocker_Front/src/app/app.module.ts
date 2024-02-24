import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AfficherTicketrComponent } from './components/afficher-ticket/afficher-ticketr.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AjouterticketComponent } from './components/ajouterticket/ajouterticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateticketComponent } from './components/updateticket/updateticket.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';
import { MetricComponent } from './components/metric/metric.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AfficherTicketrComponent,
    AjouterticketComponent,
    UpdateticketComponent,
    ChatComponent,
    MessageComponent,
    MetricComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
