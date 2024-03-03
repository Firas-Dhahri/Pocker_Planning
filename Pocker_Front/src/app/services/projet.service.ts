import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'tslib';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private baseUrl = 'http://localhost:8090/Pocker/Projet';

  constructor(private http: HttpClient) { }
  
  getAllProjets() {
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-projets`); // Adjust the type to match the expected response
  }
  getProjetById(projetId:number) {
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-projet/${projetId}`); // Adjust the type to match the expected response
  }
  createProjet(ProjetData: any) {
    return this.http.post<any>(`${this.baseUrl}/addProjet`, ProjetData);
  } 
  deleteProjet(projetId:number) {
    return this.http.delete<any>(`${this.baseUrl}/remove-projet/${projetId}`);
  }
  
  updateProjetByKey(projetId: number | null, projet: any) {
    const url = `${this.baseUrl}/modify-carte/${projetId}`;
    return this.http.put<any>(url, projet);
  }

}
