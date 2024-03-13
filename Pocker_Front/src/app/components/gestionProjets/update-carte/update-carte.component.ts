import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-update-carte',
  templateUrl: './update-carte.component.html',
  styleUrls: ['./update-carte.component.css']
})
export class UpdateCarteComponent {

  carteForm: FormGroup;

  carte: any; // Define variable to hold project data
  carteId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private carteService: CarteService, // Inject your CarteService
    private toastr: ToastrService
  ) {
    this.carteForm = this.formBuilder.group({
      valeur: ['', Validators.required], // Include valeur field in the form with required validator
      image: ['', Validators.required], // Include image field in the form with required validator
    });
  }

  ngOnInit(): void {
    this.carteId = parseInt(this.route.snapshot.paramMap.get('carteId') || '0');

  }

  onSubmit(): void {
    if (this.carteForm.valid) {
      
      this.carteService.updateCarteByKey(this.carteId, this.carteForm.value).subscribe(
        (response) => {
          console.log('Carte updated successfully:', response);
          this.toastr.success('Carte updated successfully:', 'Success');
          this.carteForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error updating carte:', error);
          this.toastr.error(error.message, 'Error');
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }


}
