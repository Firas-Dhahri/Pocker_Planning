import { Component } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {TicketService} from "../../../services/tickettservice/ticket.service";
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-ajouterticket',
  templateUrl: './ajouterticket.component.html',
  styleUrls: ['./ajouterticket.component.css']
})
export class AjouterticketComponent {
  ticketForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private toastr: ToastrService
  ) {
    this.ticketForm = this.formBuilder.group({
      key: ['', [Validators.required, this.uppercaseValidator]], // Include key field in the form with validators
      fields: this.formBuilder.group({
        summary: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]], // Summary with required and pattern validators
        customfield_10016: [''], // Complexity field
        description: ['', Validators.required], // Description with required validator
        issuetype: this.formBuilder.group({
          name: ['', Validators.required] // Issue Type field with required validator
        })
      })
    });
  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.ticketService.createTicket(this.ticketForm.value).subscribe(
        (response) => {
          console.log('Ticket created successfully:', response);
          this.toastr.success('Ticket created successfully:', 'Success');
          this.ticketForm.reset(); // Reset the form after submission
        },
        (error) => {
          console.error('Error creating ticket:', error);
          this.toastr.error(error.message, 'Error');
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }

  uppercaseValidator(control: AbstractControl) {
    const value = control.value;
    if (value && value !== value.toUpperCase()) {
      return { uppercase: true };
    }
    return null;
  }
}
