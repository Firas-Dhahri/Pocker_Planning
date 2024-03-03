import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'tslib';


@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl = 'http://localhost:8090/Pocker/ticket';

  constructor(private http: HttpClient) { }

  getAllTickets() {
    return this.http.get<any[]>(`${this.baseUrl}/afficherlestickets`); // Adjust the type to match the expected response
  }
  getTicektById(key:string | null) {
    return this.http.get<any[]>(`${this.baseUrl}/afficherlestickets/${key}`); // Adjust the type to match the expected response
  }
  createTicket(ticketData: any) {
    return this.http.post<any>(`${this.baseUrl}/createIssue`, ticketData);
  } 
  deleteIssue(issueKey:string | null) {
    return this.http.delete<any>(`${this.baseUrl}/delete/${issueKey}`);
  }
  
  updateIssueByKey(issueKey: string | null, ticket: any) {
    const url = `${this.baseUrl}/update/${issueKey}`;
    return this.http.put<any>(url, ticket);
  }
}
