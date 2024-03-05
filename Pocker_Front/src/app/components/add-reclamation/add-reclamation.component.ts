import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
  
  reclamationData: any = {};
  

  constructor(private reclamationService: ReclamationService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  createReclamation() {
    this.reclamationService.createReclamation(this.reclamationData).subscribe(
      response => {
        this.toastr.success('Reclamation added successfully!', 'Success');
        console.log('Reclamation added successfully!', response);
        // Réinitialiser les données du formulaire après l'ajout réussi
        this.reclamationData = {};
      },
      error => {
        console.error('Error adding reclamation:', error);
        this.toastr.error('Failed to add reclamation. Please try again.', 'Error');
      }
    );
  }
  
  

}
