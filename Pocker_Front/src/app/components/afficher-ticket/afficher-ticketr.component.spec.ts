import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherTicketrComponent } from './afficher-ticketr.component';

describe('AfficherTicketrComponent', () => {
  let component: AfficherTicketrComponent;
  let fixture: ComponentFixture<AfficherTicketrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfficherTicketrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfficherTicketrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
