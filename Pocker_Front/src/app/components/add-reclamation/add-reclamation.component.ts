import { Component } from '@angular/core';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-reclamation',
  templateUrl: './add-reclamation.component.html',
  styleUrls: ['./add-reclamation.component.css']
})
export class AddReclamationComponent {
  reclamationData: any = {};
  selectedFile: File | null = null; // To store the selected file

  constructor(private reclamationService: ReclamationService, private toastr: ToastrService,private http: HttpClient) { }
  submitScanForm() {
    // Logique pour soumettre le formulaire de scan de photo
    console.log('Form submitted for photo scanning...');
    this.scanPhoto();
}
scanPhoto() {
  if (this.selectedFile) {
    const formData = new FormData();
    formData.append('imageFile', this.selectedFile);

    this.http.post('http://localhost:8089/reclamations/extractText', formData, { responseType: 'text' }).subscribe(
      response => {
        // Traitement de la réponse du backend en tant que texte brut
        console.log('Text extracted:', response);
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        // Mettez à jour la valeur de l'élément input avec le texte extrait
        if (descriptionInput) {
          descriptionInput.value = response;
        }
      },
      error => {
        // Gestion des erreurs
        console.error('Error extracting text:', error);
        // Vous pouvez afficher un message d'erreur à l'utilisateur ici
      }
    );
  } else {
    console.error('No file selected.');
  }
}


  createReclamation() {
    const formData = new FormData();
    // Append reclamation data
    Object.entries(this.reclamationData).forEach(([key, value]) => {
      formData.append(key, value as string); // Cast value to string
    });
    // Append file
    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    this.reclamationService.createReclamation(formData).subscribe(
      response => {
        this.toastr.success('Reclamation added successfully!', 'Success');
        console.log('Reclamation added successfully!', response);
        // Reset form data and selected file
        this.reclamationData = {};
        this.selectedFile = null;
      },
      error => {
        console.error('Error adding reclamation:', error);
        this.toastr.error('Failed to add reclamation. Please try again.', 'Error');
      }
    );
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }
}

  
  


