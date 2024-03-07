import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsreclamationComponent } from './detailsreclamation.component';

describe('DetailsreclamationComponent', () => {
  let component: DetailsreclamationComponent;
  let fixture: ComponentFixture<DetailsreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsreclamationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
