import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  users: any[] = [];
  isLoggedIn: boolean = false;
  currentUser: any = {};

  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifie si l'utilisateur est connecté avant de récupérer ses informations
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.currentUser = this.storageService.getUser();
      this.getAdminBoard();
    } else {
      // Redirige l'utilisateur vers la page de connexion
      this.router.navigate(['/login']);
    }
  }

  getAdminBoard(): void {
    this.userService.getAdminBoard().subscribe(
      data => {
        console.log('Admin board data:', data);
        this.content = data;
        this.getUsers();
      },
      error => {
        console.error('Error fetching admin board:', error);
        if (error.error) {
          try {
            const res = JSON.parse(error.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${error.status} - ${error.statusText}`;
          }
        } else {
          this.content = `Error with status: ${error.status}`;
        }

        // Logs additionnels pour détailler l'erreur
        console.error('Error details:', error);
        console.error('Error headers:', error.headers);
        console.error('Error status:', error.status);
        console.error('Error status text:', error.statusText);
      }
    );
  }

  getUsers(): void {
    this.userService.getAllUsers().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  activateAccount(userId: number): void {
    this.userService.activateAccount(userId).subscribe(
      response => {
        console.log('Account activated successfully:', response);
        this.getUsers();
      },
      error => {
        console.error('Error activating account:', error);
      }
    );
  }

  deactivateAccount(userId: number): void {
    this.userService.deactivateAccount(userId).subscribe(
      response => {
        console.log('Account deactivated successfully:', response);
        this.getUsers();
      },
      error => {
        console.error('Error deactivating account:', error);
      }
    );
  }
}