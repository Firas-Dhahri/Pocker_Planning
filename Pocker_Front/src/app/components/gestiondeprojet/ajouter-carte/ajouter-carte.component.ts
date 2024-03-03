import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


import { AbstractControl } from '@angular/forms';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-ajouter-carte',
  templateUrl: './ajouter-carte.component.html',
  styleUrls: ['./ajouter-carte.component.css']
})
export class AjouterCarteComponent implements OnInit {
  carteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private carteService: CarteService, // Inject your CarteService
    private toastr: ToastrService
  ) {
    this.carteForm = this.formBuilder.group({
      valeur: ['', Validators.required], // Include valeur field in the form with required validator
      image: ['', Validators.required], // Include image field in the form with required validator
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.carteForm.valid) {
      this.carteService.createCarte(this.carteForm.value).subscribe(
        (response) => {
          console.log('Carte created successfully:', response);
          this.toastr.success('Carte created successfully:', 'Success');
          this.carteForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error creating carte:', error);
          this.toastr.error(error.message, 'Error');
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }
}