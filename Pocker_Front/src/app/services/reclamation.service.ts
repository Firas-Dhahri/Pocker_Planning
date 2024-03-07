import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private apiUrl = 'http://localhost:8089';

  constructor(private http: HttpClient) { }
  getAllReclamations() {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations`);
  }
  createReclamation(reclamationData: any) {
    return this.http.post<any>(`${this.apiUrl}/reclamations/create-reclamation`, reclamationData);
  } 
  getReclamationById(id:number) {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations/${id}`); // Adjust the type to match the expected response
  }
  updateReclamation(id: number, reclamationData: any) {
    const url = `${this.apiUrl}/reclamations/update-reclamation/${id}`;
    return this.http.put<any>(url, reclamationData); // Added a forward slash before id
  }
  deleteReclamation(id: number): Observable<void> {
    const url = `${this.apiUrl}/reclamations/delete-reclamation/${id}`;
    return this.http.delete<void>(url);
  }
  getReclamationsByStatut(statut: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations/byStatut/${statut}`);
  }
  getReclamationsByPriority(priority: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations/priority/${priority}`);
  }
  getReclamationsByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations/Type/${type}`);
  }
  getReclamationsSortedByDate(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reclamations/sorted-by-date`);
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/assigned/users`); // Adjust the endpoint as per your backend API
  }
  assignReclamationToUser(reclamationId: number, userId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reclamations/${reclamationId}/assign/${userId}`, {});
  }
  getReclamationsFiltered(statut: string, priority: string, type: string): Observable<any[]> {
    // Adjust the API endpoint and request parameters based on your backend API
    const url = `${this.apiUrl}/reclamations?statut=${statut}&priority=${priority}&type=${type}`;
    return this.http.get<any[]>(url);
  }
  getUserById(userId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/users/${userId}`);
  }
  
  sendNotificationsPeriodically(): Observable<any> {
    // Utilisez timer pour émettre une valeur chaque minute
    return timer(0, 60000).pipe(
      // Utilisez switchMap pour envoyer une requête HTTP à chaque fois que le timer émet une valeur
      switchMap(() => this.http.get('http://localhost:8089/reclamations/send-notifications')));
  }
  
  

}
