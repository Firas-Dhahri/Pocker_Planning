import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { CarteService } from 'src/app/services/carte.service';

@Component({
  selector: 'app-afficher-carte',
  templateUrl: './afficher-carte.component.html',
  styleUrls: ['./afficher-carte.component.css']
})
export class AfficherCarteComponent implements OnInit {
  cartes: any[] = [];

  constructor(private carteService: CarteService,private toastr: ToastrService ,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllCartes();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  getAllCartes() {
    this.carteService.getAllCartes().subscribe(
      (response: any[]) => { // Change the type of response to match what you expect
        this.cartes = response;
        console.log('Cartes:', this.cartes);
      },
      (error) => {
        console.error('Error fetching cartes:', error);
      }
    );
  }
  deleteCarte(carteId: number | null) {
    this.carteService.deleteCarte(carteId).subscribe(
      (response) => {
        console.log('Carte deleted');
        this.toastr.success('Carte deleted successfully:', 'Deleted');
        // Update the tickets array by removing the deleted item
        this.cartes = this.cartes.filter(carte => carte.id !== carteId);
      },
      (error) => {
        console.error('Error deleting carte:', error);
      }
    );
  }


}
