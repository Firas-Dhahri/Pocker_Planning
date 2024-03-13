import {HttpClient, HttpHeaders} from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Client, Message, Stomp } from '@stomp/stompjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable ,throwError  } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {StorageService} from "../userservice/storage.service";
import {AuthService} from "../userservice/auth.service";
declare var SockJS: any;




@Injectable({
  providedIn: 'root'
})
export class PokerserviceService {
  BasedUrl = "http://localhost:8090";
  private client!: Client;
  private sessionIdSubject = new BehaviorSubject<number | null>(null);
  public startedvote = new BehaviorSubject(false);

  sessionId$ = this.sessionIdSubject.asObservable();
  private sessionSubject: Subject<any> = new Subject<any>();
  private messageSubject: Subject<any> = new Subject<any>();

  private stompClient!: Client;


private socket!: WebSocket;


  private remainingTime: any;


  setRemainingTime(time: any): void {
    this.remainingTime = time;
  }

  getRemainingTime(): any {
    return this.remainingTime;
  }

  setSessionId(sessionId: number) {
    this.sessionIdSubject.next(sessionId);
  }



  constructor(private http:HttpClient  , private stoargeservice:StorageService , private authService:AuthService ) {}
  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || this.getTokenFromStorage();

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private getTokenFromStorage(): string | null {
    const user = this.stoargeservice.getUser();
    return user?.token || null;
  }


  /*connect1(): void {
    this.socket = new SockJS('http://localhost:8090/ws');
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
    this.socket.onmessage = (event) => {
      console.log('Received message:', event.data);
    };
    this.socket.onclose = (event) => {
      console.log('WebSocket connection closed:', event);
    };
    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

  }*/




  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
  addSession(session: any): Observable<any> {
    return this.http.post<any>(`${this.BasedUrl}/session/AddSession` ,session);
  }

  updateSession(session:any){
    return this.http.put<string>(`${this.BasedUrl}/session/update/1` ,session);
  }
  updateSessionFalse(session:any){
    return this.http.put<string>(`${this.BasedUrl}/session/updateFalse/1` ,session);
  }

  getSession(): Observable<any> {
    return this.sessionSubject.asObservable();
  }
  getRemainingTimeForSession(sessionId: number): Observable<string> {
    return this.http.get<string>(`${this.BasedUrl}/session/remaining-time/${sessionId}`);
  }
  getbyid(): any{
    return this.http.get<any>("http://localhost:8090/session/getbyid");
  }
  
  AddvideoConferance(roomname:any , idsession:any, host:any){

    return this.http.get<any>(`${this.BasedUrl}/session/createVideoConférance/${roomname}/${idsession}/${host}` , );
  }





}
