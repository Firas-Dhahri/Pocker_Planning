import { Injectable } from '@angular/core';
import {HttpHeaders} from "@angular/common/http";
import {AuthService} from "../userservice/auth.service";
import {StorageService} from "../userservice/storage.service";

@Injectable({
  providedIn: 'root'
})
export class MessageserviceService {

  constructor(private authService:AuthService, private stoargeservice:StorageService) { }

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
}
