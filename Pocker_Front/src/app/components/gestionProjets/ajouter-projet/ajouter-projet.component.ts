import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjetService } from 'src/app/services/projet.service';
import { ToastrService } from 'ngx-toastr';
import { CarteService } from 'src/app/services/carte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajouter-projet',
  templateUrl: './ajouter-projet.component.html',
  styleUrls: ['./ajouter-projet.component.css']
})
export class AjouterProjetComponent implements OnInit{

  projetForm: FormGroup;
  //allCartes: any[] = [];
  //selectedCartes: number[] = [];


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private projetService: ProjetService, 
    private carteService: CarteService,// Inject your projetService
    private toastr: ToastrService
  ) {
    this.projetForm = this.formBuilder.group({
      titre: ['', Validators.required],
      objectif: ['', Validators.required],
     /* date_debut: [null, Validators.required], // Use null as initial value for date fields
      date_fin: [null, Validators.required], // Use null as initial value for date fields
      duree: ['', Validators.required], // Assuming it's required, but you can adjust validators as needed
      contraintes: ['', Validators.required],
      exigences: ['', Validators.required],
      dependance: ['', Validators.required],
      budget: ['', Validators.required],
      algo: ['', Validators.required]*/
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
