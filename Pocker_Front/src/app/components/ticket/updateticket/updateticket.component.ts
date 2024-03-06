import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { ToastrService } from 'ngx-toastr';
import {TicketService} from "../../../services/tickettservice/ticket.service";
@Component({
  selector: 'app-updateticket',
  templateUrl: './updateticket.component.html',
  styleUrls: ['./updateticket.component.css']
})
export class UpdateticketComponent implements OnInit   {
  ticketForm: FormGroup;
  issueKey!:string | null;
  ticketdetail:any;
  constructor(private formBuilder: FormBuilder, private ticketService: TicketService,private route: ActivatedRoute,private toastr: ToastrService) {
    this.ticketForm = this.formBuilder.group({
      key: ['', Validators.required], // Include key field in the form
      fields: this.formBuilder.group({
        summary: ['', Validators.required],
        customfield_10016: ['', Validators.required],
        description: ['', Validators.required],
        issuetype: this.formBuilder.group({
          name: ['Choose Task',]
        })
      })
    });
  }
  ngOnInit(): void {
    //njib  id
    this.issueKey= this.route.snapshot.paramMap.get('issueKey');
    this.ticketService.getTicektById(this.issueKey).subscribe(
      (ticketDetails: any) => {
        // Patch the form with ticket details
        this.ticketForm.patchValue({
          key: this.issueKey,
          fields: {
            summary: ticketDetails.fields.summary,
            customfield_10016: ticketDetails.fields.customfield_10016,
            description: ticketDetails.fields.description,
            issuetype: {
              name: ticketDetails.fields.issuetype.name
            }
          }
        });
      },
      error => {
        console.error('Error fetching ticket details:', error);

      }
    )

  }

  onSubmit() {
    if (this.ticketForm.valid) {
      this.ticketService.updateIssueByKey( this.issueKey, this.ticketForm.value).subscribe(
        (response) => {
          console.log('Ticket updated successfully:', response);
          this.toastr.success('Ticket Updated successfully:','Succes');

        },
        (error) => {
          console.error('Error update ticket:', error);
          // Handle error appropriately, e.g., display an error message
        }
      );
    }
  }
}
