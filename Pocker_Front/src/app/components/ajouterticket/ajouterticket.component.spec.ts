import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterticketComponent } from './ajouterticket.component';

describe('AjouterticketComponent', () => {
  let component: AjouterticketComponent;
  let fixture: ComponentFixture<AjouterticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
