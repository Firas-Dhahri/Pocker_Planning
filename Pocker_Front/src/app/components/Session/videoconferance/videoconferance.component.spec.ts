import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoconferanceComponent } from './videoconferance.component';

describe('VideoconferanceComponent', () => {
  let component: VideoconferanceComponent;
  let fixture: ComponentFixture<VideoconferanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoconferanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoconferanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
