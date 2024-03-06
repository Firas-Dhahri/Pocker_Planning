import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {StorageService} from "./storage.service";
import {Observable} from "rxjs";
const API_URL = 'http://localhost:8090/api/';
const USERS_URL = API_URL + 'users/';
const TEST_URL = API_URL + 'test/';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  getScrumMasterBoard() {
    throw new Error('Method not implemented.');
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private storageService: StorageService
  ) {}

  // UserService
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



  private saveTokenToStorage(token: string): void {
    this.storageService.saveUser({ token });
  }

  private getTokenFromStorage(): string | null {
    const user = this.storageService.getUser();
    return user?.token || null;
  }

  getPublicContent(): Observable<any> {
    return this.http.get(TEST_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(TEST_URL + 'user', { headers: this.getHeaders(), responseType: 'text' });
  }

  getDeveloperBoard(): Observable<any> {
    return this.http.get(TEST_URL + 'developer', { headers: this.getHeaders(), responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(TEST_URL + 'admin', { headers: this.getHeaders(), responseType: 'text' });
  }

  activateAccount(userId: number): Observable<any> {
    return this.http.put(USERS_URL + 'activate-account/' + userId, {}, { headers: this.getHeaders() });
  }

  deactivateAccount(userId: number): Observable<any> {
    return this.http.put(USERS_URL + 'deactivate-account/' + userId, {}, { headers: this.getHeaders() });
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(USERS_URL, { headers: this.getHeaders() });
  }
}
