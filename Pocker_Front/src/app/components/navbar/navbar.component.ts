import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import {StorageService} from "../../services/userservice/storage.service";
import {AuthService} from "../../services/userservice/auth.service";
import {Subscription} from "rxjs";
import {EventbusService} from "../../services/userservice/shared/eventbus.service";
import {Router} from "@angular/router";
>>>>>>> f63b69fb615c7369c9e19c572f91cbb40c7d464c

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
<<<<<<< HEAD

=======
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showDevBoard = false;
  username?: string;

  eventBusSub?: Subscription;


  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private eventBusService: EventbusService , private router:Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showDevBoard = this.roles.includes('ROLE_DEVELOPER');

      this.username = user.username;
    }

    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
this.router.navigateByUrl('/login') ;
      },
      error: err => {
        console.log(err);
      }
    });
  }
>>>>>>> f63b69fb615c7369c9e19c572f91cbb40c7d464c
}
