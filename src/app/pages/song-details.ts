import {
  ViewChild,
  Component,
  OnInit,
  inject,
  DestroyRef,
  signal,
  WritableSignal,
  computed,
  effect,
} from '@angular/core';
import { ElementRef } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { SongI } from '../features/songs-card-list/songs-card-list';
import { catchError, finalize, of, switchMap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChartComponent } from '../shared/chart/chart.component';

@Component({
  selector: 'app-song-details',
  imports: [ChartComponent],
  templateUrl: './song-details.html',
  styleUrl: './song-details.scss',
  host: {
    ngSkipHydration: 'true',
  },
})
export class SongDetails implements OnInit {
  @ViewChild('audioPlayer', { static: true })
  audioPlayer!: ElementRef<HTMLAudioElement>;
  @ViewChild('progressBar', { static: true })
  progressBar!: ElementRef<HTMLDivElement>;
  private activatedRoute = inject(ActivatedRoute);
  private apiService = inject(ApiService);
  private destroyRef = inject(DestroyRef);
  private audio!: HTMLAudioElement;

  songId = signal('');
  currentTime = signal(0);
  error = signal<string | null>(null);
  song: WritableSignal<SongI | null> = signal(null);
  isLoading: WritableSignal<boolean> = signal(false);
  series: WritableSignal<number[]> = signal([]);
  isPlayed: WritableSignal<boolean> = signal(false);

  // Computed property for valence conversion
  valenceCategory = computed(() => {
    const currentSong = this.song();
    if (!currentSong || currentSong.valence === undefined) {
      return undefined;
    }

    const valence = currentSong.valence;
    if (valence > 0.0 && valence <= 0.3) {
      return 'Sad';
    } else if (valence > 0.3 && valence <= 0.6) {
      return 'Neutral';
    } else {
      return 'Positive';
    }
  });

  constructor() {
    effect(() => {
      const currentSong = this.song();
      if (currentSong?.preview_url && this.audio) {
        this.audio.src = currentSong?.preview_url;
        this.audio.load();
      }
    });
    // Subscribe to route params and handle automatic cleanup
    this.activatedRoute.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((params) => {
        this.songId.set(params['id']);
        if (params['id']) {
          this.loadSong();
        }
      });
  }

  ngOnInit(): void {
    this.audio = this.audioPlayer.nativeElement;
    this.setAudioSource();
  }

  private loadSong(): void {
    const id = this.songId();
    if (!id) return;

    this.error.set(null);
    this.isLoading.set(true);
    this.apiService
      .get_song(id)
      .pipe(
        finalize(() => {
          this.isLoading.set(false);
        }),
        catchError((err: HttpErrorResponse) => {
          this.isLoading.set(false);
          return of(null); // Return null instead of throwing
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (data: SongI) => {
          this.song.set(data);
          this.isLoading.set(false);
          const chartData: number[] = [
            data.energy || 0,
            data.liveness || 0,
            data.valence || 0,
          ];

          console.log('Chart data prepared:', chartData);
          this.series.set(chartData);
          console.log('Series signal updated:', this.series());
          console.log(
            typeof data.energy,
            typeof data.valence,
            typeof data.danceability
          );
        },
      });
  }

  onPlay(): void {
    this.isPlayed.set(true);
    this.playAudio();
  }
  onPause(): void {
    this.isPlayed.set(false);
  }
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
  setProgress(event: MouseEvent) {
    if (!this.audio || this.isLoading()) return;

    const rect = this.progressBar.nativeElement.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    this.audio.currentTime = percent * this.audio.duration;
  }

  updateProgress() {
    if (this.audio && !this.isLoading()) {
      this.currentTime.set(this.audio.currentTime);
    }
  }

  updateDuration() {
    if (this.audio && this.song()) {
      const duration = this.audio.duration;
      this.song.update((song) => (song ? { ...song, duration } : null));
    }
  }
  private playAudio() {
    this.audio.play().catch((e) => {
      console.error('Playback failed:', e);
      if (e.name === 'NotAllowedError') {
        this.error.set(
          'Playback blocked - please interact with the page first'
        );
      } else {
        this.error.set('Playback failed - please try again');
      }
    });
  }
  togglePlay() {
    if (!this.audio || this.isLoading()) return;

    if (this.isPlayed()) {
      this.audio.pause();
    } else {
      this.audio.play().catch((e) => {
        console.error('Playback failed:', e);
      });
    }
  }
  private setAudioSource(): void {
    const currentSong = this.song();
    if (currentSong?.preview_url && this.audio) {
      this.audio.src = currentSong.preview_url;
    }
  }
}
