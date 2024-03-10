import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamationservice/reclamation.service';

@Component({
  selector: 'app-detailsreclamation',
  templateUrl: './detailsreclamation.component.html',
  styleUrls: ['./detailsreclamation.component.css']
})
export class DetailsreclamationComponent implements OnInit {
  reclamation: any;
  utilisateurTraitantName: string = '';

  constructor(
    private recservice: ReclamationService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      console.log('Reclamation ID:', id);
      this.getReclamationById(id);
    });
  }

  getReclamationById(id: number) {
    this.recservice.getReclamationById(id).subscribe(
      (reclamation: any) => {
        console.log('Reclamation details:', reclamation);
        this.reclamation = reclamation;
        if (this.reclamation && this.reclamation.utilisateurTraitantId) {
          console.log('Utilisateur Traitant ID:', this.reclamation.utilisateurTraitantId);
          this.getUtilisateurTraitantName(); // Fetch utilisateurTraitantName if utilisateurTraitantId is not null
        }
      },
      (error) => {
        console.error('Error fetching reclamation:', error);
      }
    );
  }

  getUtilisateurTraitantName() {
    this.recservice.getUserById(this.reclamation.utilisateurTraitantId).subscribe(
      (response: any) => {
        console.log('Utilisateur Traitant details:', response);
        this.utilisateurTraitantName = response.nom;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }
}
