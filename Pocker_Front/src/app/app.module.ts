import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { AddReclamationComponent } from './components/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './components/update-reclamation/update-reclamation.component';
import { DeleteReclamationComponent } from './components/delete-reclamation/delete-reclamation.component';
import { DetailsreclamationComponent } from './components/detailsreclamation/detailsreclamation.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AfficherTicketrComponent,
    AjouterticketComponent,
    UpdateticketComponent,
    ReclamationComponent,
    AddReclamationComponent,
    UpdateReclamationComponent,
    DeleteReclamationComponent,
    DetailsreclamationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgxSpinnerModule,
    FormsModule,
    
    
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
