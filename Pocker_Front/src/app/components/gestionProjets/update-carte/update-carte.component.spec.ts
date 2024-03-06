import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCarteComponent } from './update-carte.component';

describe('UpdateCarteComponent', () => {
  let component: UpdateCarteComponent;
  let fixture: ComponentFixture<UpdateCarteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCarteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCarteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
