import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherTicketComponent } from './afficher-ticket.component';

describe('AfficherTicketComponent', () => {
  let component: AfficherTicketComponent;
  let fixture: ComponentFixture<AfficherTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
