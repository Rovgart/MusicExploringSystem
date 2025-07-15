import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongDetails } from './song-details';
import { provideZonelessChangeDetection } from '@angular/core';

describe('SongDetails', () => {
  let component: SongDetails;
  let fixture: ComponentFixture<SongDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SongDetails],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(SongDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
