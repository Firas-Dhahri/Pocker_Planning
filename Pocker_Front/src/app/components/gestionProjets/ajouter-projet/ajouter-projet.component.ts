import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from 'src/app/services/projet.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrls: ['./ajouter-projet.component.css']
})
export class AjouterProjetComponent implements OnInit{

  projetForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private projetService: ProjetService, // Inject your projetService
    private toastr: ToastrService
  ) {
    this.projetForm = this.formBuilder.group({
      valeur: ['', Validators.required], // Include valeur field in the form with required validator
      image: ['', Validators.required], // Include image field in the form with required validator
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.projetForm.valid) {
      this.projetService.createProjet(this.projetForm.value).subscribe(
        (response) => {
          console.log('projet created successfully:', response);
          this.toastr.success('Projet created successfully:', 'Success');
          this.projetForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error creating projet:', error);
          this.toastr.error(error.message, 'Error');
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }
}
