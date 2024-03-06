import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-afficher-projet',
  templateUrl: './afficher-projet.component.html',
  styleUrls: ['./afficher-projet.component.css']
})
export class AfficherProjetComponent implements OnInit {

  projets: any[] = [];

  constructor(private projetService: ProjetService ,private router: Router ,private route: ActivatedRoute ,private toastr: ToastrService ,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllProjets();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  getAllProjets() {
    this.projetService.getAllProjets().subscribe(
      (response: any[]) => { // Change the type of response to match what you expect
        this.projets = response;
        console.log('projects:', this.projets);
      },
      (error) => {
        console.error('Error fetching projets:', error);
      }
    );
  }
  getProjetById(projetId: number)
  {
    this.router.navigate(['/showprojet',projetId]);
  }
  deleteProjet(projetId: number ) {
    this.projetService.deleteProjet(projetId).subscribe(
      (response) => {
        console.log('Projet deleted');
        this.toastr.success('Projet deleted successfully:', 'Deleted');
        // Update the tickets array by removing the deleted item
        this.projets = this.projets.filter(projet => projet.id !== projetId);
      },
      (error) => {
        console.error('Error deleting projet:', error);
      }
    );
  }

}
