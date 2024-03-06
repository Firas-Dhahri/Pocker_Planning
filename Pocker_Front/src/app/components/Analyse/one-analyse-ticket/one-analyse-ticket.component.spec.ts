import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneAnalyseTicketComponent } from './one-analyse-ticket.component';

describe('OneAnalyseTicketComponent', () => {
  let component: OneAnalyseTicketComponent;
  let fixture: ComponentFixture<OneAnalyseTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OneAnalyseTicketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OneAnalyseTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
