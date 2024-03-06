import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Analyse} from "../../Models/Analyse";

@Injectable({
  providedIn: 'root'
})
export class AnalyseService {
  url="http://localhost:8090"

  constructor(private http:HttpClient) { }
  getAll():Observable<Analyse[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Analyse[]>(this.url+'/retrieve-all-Analyses', { headers })
  };


  getsprint_retard(id:number){
    return this.http.get(`${this.url}/get_analyse_retard/${id}`)

  }

  Pourcentage_avancement_projet(id:number){
    return this.http.get(`${this.url}/get_pourcentage_avancement/${id}`)
  }

  getAnalyse_par_projet():Observable<Analyse[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    //  return this.http.get<Analyse[]>("http://localhost:8090/Pocker/getAnalyses_par_projets/1")
    return this.http.get<Analyse[]>(this.url+"/getAnalyses_par_projets_khalil")
  };

  AjouterAnalyse(analyse: any,id:any): Observable<any> {
    return this.http.post(`${this.url}/add-Analyse/${id}`, analyse);
    // return this.http.post(this.url+'/add-Analyse/${id}', analyse);
  }
  AjouterAnalyse_us(analyse: any,id:any): Observable<any> {
    return this.http.post(`${this.url}/add-Analyse_us/${id}`, analyse);
    // return this.http.post(this.url+'/add-Analyse/${id}', analyse);
  }
  Supprimer_Analyse(id:number){return this.http.delete(`${this.url}/delete-Analyse/${id}`)}

  getOneAnalyse(id:number){
    return this.http.get(`${this.url}/retrieve-Analyse/${id}`)
  }

  getAnalyse_par_Us():Observable<Analyse[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return this.http.get<Analyse[]>(this.url+'/getAnalyses_par_us', { headers })
  };

  getSprint_par_Projet(id:number){
    return this.http.get(`${this.url}/Liste_Sprint_par_projet/${id}`)

  }
  getSprint_en_cours(id:number){
    return this.http.get(`${this.url}/get_sprint_en_cours/${id}`)

  }
  getOne_ticket(id:any){
    return this.http.get(`${this.url}/retrieve-ticket/${id}`)

  }



}
