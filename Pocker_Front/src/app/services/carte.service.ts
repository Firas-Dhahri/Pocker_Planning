import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'tslib';

@Injectable({
  providedIn: 'root'
})
export class CarteService {
  private baseUrl = 'http://localhost:8090/Pocker/Carte';


  constructor(private http: HttpClient) { }
  getAllCartes() {
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-all-cartes`); // Adjust the type to match the expected response
  }
  getCarteById(carteId: number | null) {
    return this.http.get<any[]>(`${this.baseUrl}/retrieve-carte/${carteId}`); // Adjust the type to match the expected response
  }
  createCarte(CarteData: any) {
    return this.http.post<any>(`${this.baseUrl}/addCarte`, CarteData);
  } 
  deleteCarte(carteId: number | null) {
    return this.http.delete<any>(`${this.baseUrl}/remove-carte/${carteId}`);
  }
  
  updateCarteByKey(carteId: number | null, carte: any) {
    const url = `${this.baseUrl}/modify-carte/${carteId}`;
    return this.http.put<any>(url, carte);
  }

}
