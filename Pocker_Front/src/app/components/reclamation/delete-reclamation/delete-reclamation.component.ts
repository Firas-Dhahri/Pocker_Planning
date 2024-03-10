import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ReclamationService } from 'src/app/services/reclamationservice/reclamation.service';
import { ActivatedRoute,Router } from '@angular/router';
@Component({
  selector: 'app-delete-reclamation',
  templateUrl: './delete-reclamation.component.html',
  styleUrls: ['./delete-reclamation.component.css']
})
export class DeleteReclamationComponent implements OnInit{
  constructor(private recservice: ReclamationService, private router: Router,private route: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService) { }
  reclamation: any;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.getReclamationById(id);
    });
  }

  getReclamationById(id: number) {
    this.recservice.getReclamationById(id).subscribe(
      (reclamation: any) => {
        this.reclamation = reclamation;
        console.log('Reclamation:', this.reclamation);
      },
      (error) => {
        console.error('Error fetching reclamation:', error);
      }
    );
  }

  deleteReclamation(id: number) {
    if (confirm('Are you sure you want to delete this reclamation?')) {
      this.recservice.deleteReclamation(id).subscribe(
        () => {
          this.toastr.success('Reclamation deleted successfully!', 'Success');
          this.router.navigate(['/reclamations']);
          // Optionally, you can redirect to another page after deletion
          // this.router.navigate(['/some-other-route']);
        },
        (error) => {
          console.error('Error deleting reclamation:', error);
          this.toastr.error('Failed to delete reclamation. Please try again.', 'Error');
        }
      );
    }

  }

}

