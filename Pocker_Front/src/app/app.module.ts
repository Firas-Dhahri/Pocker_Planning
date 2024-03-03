import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AfficherTicketrComponent } from './components/afficher-ticket/afficher-ticketr.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AjouterticketComponent } from './components/ajouterticket/ajouterticket.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateticketComponent } from './components/updateticket/updateticket.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AjouterProjetComponent } from './components/gestiondeprojet/ajouter-projet/ajouter-projet.component';
import { AfficherProjetComponent } from './components/gestiondeprojet/afficher-projet/afficher-projet.component';
import { AjouterCarteComponent } from './components/gestiondeprojet/ajouter-carte/ajouter-carte.component';
import { AfficherCarteComponent } from './components/gestiondeprojet/afficher-carte/afficher-carte.component';
import { UpdateProjetComponent } from './components/gestiondeprojet/update-projet/update-projet.component';
import { UpdateCarteComponent } from './components/gestiondeprojet/update-carte/update-carte.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AfficherTicketrComponent,
    AjouterticketComponent,
    UpdateticketComponent,
    AfficherCarteComponent,
    AjouterCarteComponent,
    AjouterProjetComponent,
    AfficherProjetComponent,
    UpdateProjetComponent,
    UpdateCarteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule 
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
