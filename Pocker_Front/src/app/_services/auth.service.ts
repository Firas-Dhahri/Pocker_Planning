// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from './storage.service';  // Importez le service de stockage

interface AuthResponse {
  token: string;  // Ajoutez le type attendu pour le token ici
  // Ajoutez d'autres champs si nécessaire
}

const AUTH_API = 'http://localhost:8082/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(
      AUTH_API + 'signin',
      { username, password },
      httpOptions
    )
    .pipe(
      tap(response => {
        // Enregistrez les informations de l'utilisateur dans le sessionStorage
        this.storageService.saveUser({ token: response.token });
      }),
      catchError(error => {
        // Gérez les erreurs de connexion, si nécessaire
        console.error('Login error:', error);
        throw error;
      })
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      { username, email, password },
      
    )
    .pipe(
      catchError(error => {
        // Gérez les erreurs d'inscription, si nécessaire
        console.error('Registration error:', error);
        throw error;
      })
    );
  }

  logout(): Observable<any> {
    // Supprimez les informations de l'utilisateur du sessionStorage lors de la déconnexion
    this.storageService.clean();
    return this.http.post(AUTH_API + 'signout', {}, httpOptions);
  }

  getToken(): string | null {
    // Obtenez le token depuis le sessionStorage
    const user = this.storageService.getUser();
    return user?.token || null;
  }

  isLoggedIn(): boolean {
    // Vérifiez si l'utilisateur est connecté en fonction du token
    return !!this.getToken();
  }
}
