import { Component, OnInit } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamationservice/reclamation.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-reclamation',
  templateUrl: './update-reclamation.component.html',
  styleUrls: ['./update-reclamation.component.css']
})
export class UpdateReclamationComponent implements OnInit {
  reclamationForm: FormGroup;
  id!: number; // Assuming the reclamation ID is of type number
  reclamationDetails: any;
  users: any[] = []; // Add a property to store the list of users

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private reclamationService: ReclamationService,
    private toastr: ToastrService
  ) {
    this.reclamationForm = this.formBuilder.group({
      utilisateurId: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
      priorite: ['', Validators.required],
      statut: ['', Validators.required],
      selectedUser: [''],
      pieceJointe: [''] // Assuming pieceJointe is optional
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id')); // Convert the id to number
    this.loadReclamationDetails();
    this.getUsers();
  }
  getUsers() {
    this.reclamationService.getUsers().subscribe(
      (users: any[]) => {
        this.users = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  loadReclamationDetails() {
    this.reclamationService.getReclamationById(this.id).subscribe(
      (reclamationDetails: any) => {
        this.reclamationDetails = reclamationDetails;
        this.reclamationForm.patchValue({
          utilisateurId: reclamationDetails.utilisateurId,
          description: reclamationDetails.description,
          type: reclamationDetails.type,
          priorite: reclamationDetails.priorite,
          statut: reclamationDetails.statut,
          selectedUser: reclamationDetails.utilisateurTraitantId // Set the selected user ID in the form
          // Update with other form fields as needed
        });
      },
      (error) => {
        console.error('Error fetching reclamation details:', error);
      }
    );
  }

  onSubmit() {
    if (this.reclamationForm.valid) {
      const selectedUserId = this.reclamationForm.get('selectedUser')?.value;
      const formData = { ...this.reclamationForm.value, utilisateurTraitantId: selectedUserId };
      this.reclamationService.updateReclamation(this.id, formData).subscribe(
        (response) => {
          console.log('Reclamation updated successfully:', response);
          this.toastr.success('Reclamation updated successfully!', 'Success');
        },
        (error) => {
          console.error('Error updating reclamation:', error);
          this.toastr.error('Failed to update reclamation. Please try again.', 'Error');
        }
      );
    }
  }
}
