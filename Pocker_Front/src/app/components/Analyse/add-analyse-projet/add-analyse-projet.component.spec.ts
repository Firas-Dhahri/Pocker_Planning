import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnalyseProjetComponent } from './add-analyse-projet.component';

describe('AddAnalyseProjetComponent', () => {
  let component: AddAnalyseProjetComponent;
  let fixture: ComponentFixture<AddAnalyseProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAnalyseProjetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnalyseProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
