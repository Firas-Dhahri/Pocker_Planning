import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherCarteComponent } from './afficher-carte.component';

describe('AfficherCarteComponent', () => {
  let component: AfficherCarteComponent;
  let fixture: ComponentFixture<AfficherCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
