import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokerserviceService } from 'src/app/services/sessionservice/pokerservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {

  @Input() workItems:any;

  @Output() voteStarted = new EventEmitter<void>();
  @Output() IdTickets = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {

  }

  us(t: any) {
    this.voteStarted.emit();
    this.IdTickets.emit(t.id);
  }

}
