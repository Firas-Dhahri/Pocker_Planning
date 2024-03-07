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
  console.log("Entering scanPhoto()");
  
  if (this.selectedFile) {
    console.log("File selected, initiating text extraction with extractBlueText endpoint");
    
    const formData = new FormData();
    formData.append('imageFile', this.selectedFile);

    this.http.post('http://localhost:8089/reclamations/extractBlueText', formData, { responseType: 'text' }).subscribe(
      response => {
        
        console.log("Received response from extractBlueText endpoint:", response);
        
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        if (descriptionInput) {
          const extractedTextWithSubject = 'Subject: ' + response.trim();
          descriptionInput.value = extractedTextWithSubject;
          this.reclamationData.description = extractedTextWithSubject;
          
          if (response.includes('Ajouter Réclamation')) {
            this.reclamationData.type = 'BUG';
            this.reclamationData.statut = 'OPEN';
            this.reclamationData.priorite = 'MEDIUM';
          } if (response.includes('Reclamations')) {
            this.reclamationData.type = 'ABUS_SPAM';
            this.reclamationData.statut = 'OPEN';
            this.reclamationData.priorite = 'LOW';
          }
          else if (!response.trim()) {
            this.scanPhoto1(); // Appeler scanPhoto1() si rien n'est détecté
          }
         
        }
      },
      error => {
       
        this.scanPhoto1();
      }
    );
  } else {
    console.error('No file selected.');
  }
}

scanPhoto1() {
  console.log("Entering scanPhoto1()");
  
  if (this.selectedFile) {
    console.log("File selected, initiating text extraction with extractText endpoint");
    
    const formData = new FormData();
    formData.append('imageFile', this.selectedFile);

    this.http.post('http://localhost:8089/reclamations/extractText', formData, { responseType: 'text' }).subscribe(
      response => {
        console.log("Received response from extractText endpoint:", response);
        
        const descriptionInput = document.getElementById('description') as HTMLInputElement;
        if (descriptionInput) {
          const extractedTextWithSubject = 'Subject: ' + response.trim();
          descriptionInput.value = extractedTextWithSubject;
          this.reclamationData.description = extractedTextWithSubject;
          
          if (response.includes('404 (Not Found)')) {
            this.reclamationData.description = 'the server responded with a status of 404 (Not Found)';
            this.reclamationData.type = 'BUG';
            this.reclamationData.statut = 'OPEN';
            this.reclamationData.priorite = 'HIGH';
          } 
        }
      },
      error => {
        console.error('Error extracting text with extractText:', error);
        this.reclamationData.description = 'the server responded with a status of 404 (Not Found)';
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

  
  


