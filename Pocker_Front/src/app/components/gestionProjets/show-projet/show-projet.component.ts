import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-show-projet',
  templateUrl: './show-projet.component.html',
  styleUrls: ['./show-projet.component.css']
})
export class ShowProjetComponent implements OnInit {

  projet: any; // Define variable to hold project data
  projetId: number = 0;

  constructor(private projetService: ProjetService, private route: ActivatedRoute) { }


  ngOnInit(): void {
    // Call a method to fetch project data from service
    this.projetId = parseInt(this.route.snapshot.paramMap.get('projetId') || '0');
    this.projetService.getProjetById(this.projetId).subscribe(data =>{
      this.projet = data;
    })

  }

  // Method to fetch project data from service
 /* getProjetData() {
    // Call the appropriate method from your projet service to fetch project data
    this.projetId= this.route.snapshot.paramMap.get('projetId');
    
    this.projetService.getProjetById(projetId).subscribe(
      (data: any) => {
        this.projet = data; // Assign fetched project data to variable
      },
      (error: any) => {
        console.error('Error fetching project data:', error);
      }
    );
  }*/

}
