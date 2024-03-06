import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDevelopperComponent } from './board-developper.component';

describe('BoardDevelopperComponent', () => {
  let component: BoardDevelopperComponent;
  let fixture: ComponentFixture<BoardDevelopperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardDevelopperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDevelopperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
