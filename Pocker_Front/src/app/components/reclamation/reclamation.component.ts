import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit{
  reclamations: any[] = [];
  selectedUserId: any;
  usersLoaded: boolean = false; 
  

  constructor(private recservice: ReclamationService,private toastr: ToastrService ,private spinner: NgxSpinnerService,private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getUsers();
    this.getAllReclamations();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }
  getUsers() {
    this.recservice.getUsers().subscribe(
      (response: any[]) => {
        this.users = response;
        this.selectedUsers = new Array(this.users.length).fill(null); // Initialize with null values
        this.usersLoaded = true;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }
  selectedUsers: number[] = [];
  assignReclamationToUser(reclamation: any) {
    const userId = reclamation.utilisateurTraitantId; // Use utilisateurTraitantId instead of utilisateurId
    
    if (!isNaN(userId)) {
      this.recservice.assignReclamationToUser(reclamation.id, userId).subscribe(
        (response) => {
          this.toastr.success('Reclamation assigned successfully');
          // Optionally, you can update the list of reclamations after assignment
          
          // Find the assigned user and update the reclamation's user name
          const assignedUser = this.users.find(user => user.idUser === userId);
          if (assignedUser) {
            reclamation.assignedUserName = `${assignedUser.nom} ${assignedUser.prenom}`;
          }
          
          this.getAllReclamations(); // Move this line if needed
        },
        (error) => {
          console.error('Error assigning reclamation:', error);
          this.toastr.error('Failed to assign reclamation');
        }
      );
    } else {
      console.error('Invalid userId:', userId);
      this.toastr.error('Invalid user ID');
    }
  }
  
  getAllReclamations() {
    this.loadReclamationDetails();
    this.recservice.getAllReclamations().subscribe(
      
        (response: any[]) => {
          this.reclamations = response.map(reclamation => {
            return {
              ...reclamation,
              dateMiseAJour: reclamation.dateMiseAJour ? this.datePipe.transform(reclamation.dateMiseAJour, 'yyyy-MM-dd') : 'N/A',
              dateSoumission: reclamation.dateSoumission ? this.datePipe.transform(reclamation.dateSoumission, 'yyyy-MM-dd') : 'N/A'
            };
          });
          console.log('Reclamations after formatting:', this.reclamations);
        },
        (error) => {
          console.error('Error fetching reclamations:', error);
        }
      );
    }
    loadReclamationDetails() {
      this.reclamations.forEach(reclamation => {
        this.recservice.getReclamationById(reclamation.id).subscribe(
          (reclamationDetails: any) => {
            reclamation.utilisateurTraitantId = reclamationDetails.utilisateurTraitantId;
          },
          (error) => {
            console.error('Error fetching reclamation details:', error);
          }
        );
      });
    }
    onStatutChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      this.getReclamationsByStatut(value);
    }
    getReclamationsByStatut(statut: string): void {
      this.recservice.getReclamationsByStatut(statut).subscribe(
        (response: any[]) => {
          this.reclamations = this.formatReclamations(response);
          console.log('Reclamations filtered by statut:', this.reclamations);
        },
        (error) => {
          console.error('Error fetching reclamations by statut:', error);
        }
      );
    }
    onPriorityChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      this.getReclamationsByPriority(value);
    }
    getReclamationsByPriority(priority: string): void {
      this.recservice.getReclamationsByPriority(priority).subscribe(
        (response: any[]) => {
          this.reclamations = this.formatReclamations(response);
          console.log('Reclamations filtered by priority:', this.reclamations);
        },
        (error) => {
          console.error('Error fetching reclamations by priority:', error);
        }
      );
    }
    onTypeChange(event: Event) {
      const target = event.target as HTMLSelectElement;
      const value = target.value;
      this.getReclamationsByType(value);
    }
    getReclamationsByType(type: string): void {
      this.recservice.getReclamationsByType(type).subscribe(
        (response: any[]) => {
          this.reclamations = this.formatReclamations(response);
          console.log('Reclamations filtered by type:', this.reclamations);
        },
        (error) => {
          console.error('Error fetching reclamations by type:', error);
        }
      );
    }
    /* getReclamationsSortedByDate(): void {
      this.recservice.getReclamationsSortedByDate()
        .subscribe(reclamations => {
          this.reclamations = reclamations;
        });
    } */
    isDateAscending: boolean = true;
  sortByDate(): void {
    this.isDateAscending = !this.isDateAscending;
    this.reclamations.sort((a, b) => {
      if (this.isDateAscending) {
        return new Date(a.dateSoumission).getTime() - new Date(b.dateSoumission).getTime();
      } else {
        return new Date(b.dateSoumission).getTime() - new Date(a.dateSoumission).getTime();
      }
    });
  }
  
    private formatReclamations(reclamations: any[]): any[] {
      return reclamations.map(reclamation => {
        return {
          ...reclamation,
          dateMiseAJour: reclamation.dateMiseAJour ? this.datePipe.transform(reclamation.dateMiseAJour, 'yyyy-MM-dd') : 'N/A',
          dateSoumission: reclamation.dateSoumission ? this.datePipe.transform(reclamation.dateSoumission, 'yyyy-MM-dd') : 'N/A'
        };
      });
    }
    users: any[] = [];
}
