import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-afficher-ticketr',
  templateUrl: './afficher-ticketr.component.html',
  styleUrls: ['./afficher-ticketr.component.css']
})
export class AfficherTicketrComponent implements OnInit {
  tickets: any[] = [];

  constructor(private ticketService: TicketService,private toastr: ToastrService ,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getAllTickets();
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
  }

  getAllTickets() {
    this.ticketService.getAllTickets().subscribe(
      (response: any[]) => { // Change the type of response to match what you expect
        this.tickets = response;
        console.log('Tickets:', this.tickets);
      },
      (error) => {
        console.error('Error fetching tickets:', error);
      }
    );
  }
  deleteIssue(key: string | null) {
    this.ticketService.deleteIssue(key).subscribe(
      (response) => {
        console.log('Ticket deleted');
        this.toastr.success('Ticket deleted successfully:', 'Deleted');
        // Update the tickets array by removing the deleted item
        this.tickets = this.tickets.filter(ticket => ticket.key !== key);
      },
      (error) => {
        console.error('Error deleting ticket:', error);
      }
    );
  }


}
