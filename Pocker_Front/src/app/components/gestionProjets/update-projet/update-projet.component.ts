import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-update-projet',
  templateUrl: './update-projet.component.html',
  styleUrls: ['./update-projet.component.css']
})
export class UpdateProjetComponent{
  

  projetForm: FormGroup;

  projet: any; // Define variable to hold project data
  projetId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private projetService: ProjetService, // Inject your CarteService
    private toastr: ToastrService
  ) {
    this.projetForm = this.formBuilder.group({
      valeur: ['', Validators.required], // Include valeur field in the form with required validator
      image: ['', Validators.required], // Include image field in the form with required validator
    });
  }

  ngOnInit(): void {
    this.projetId = parseInt(this.route.snapshot.paramMap.get('projetId') || '0');

  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      
      this.projetService.updateProjetByKey(this.projetId, this.projetForm.value).subscribe(
        (response) => {
          console.log('Projet updated successfully:', response);
          this.toastr.success('Projet updated successfully:', 'Success');
          this.projetForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error updating projet:', error);
          this.toastr.error(error.message, 'Error');
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }


}

