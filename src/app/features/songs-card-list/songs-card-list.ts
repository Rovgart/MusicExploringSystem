import { Component } from '@angular/core';
import { CardListComponent } from '../../shared/components/card/card-list.component';
import { PaginationSkeletonComponent } from '../../shared/skeletons/pagination-skeleton.component';

export interface SongI {
  id: number;
  name: string;
  artist: string;
  spotify_id: string;
  preview_url: string | null;
  img: string;
  danceability: number;
  energy: number;
  loudness: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  acousticness_artist: number;
  danceability_artist: number;
  energy_artist: number;
  instrumentalness_artist: number;
  liveness_artist: number;
  speechiness_artist: number;
  valence_artist: number;
}
export type SongRequestT = {
  items: SongI[];
  page: number;
  limit: number;
  total_items: number;
  total_pages: number;
  has_next: boolean;
  has_prev: boolean;
};
@Component({
  selector: 'songs-card-list',
  imports: [CardListComponent, PaginationSkeletonComponent],
  templateUrl: './songs-card-list.html',
  styleUrl: 'songs-card-list.scss',
  standalone: true,
})
export class SongsCardList {
  musicCards: SongRequestT = {
    items: [],
    page: 1,
    total_pages: 1,
    total_items: 1,
    limit: 0,
    has_next: false,
    has_prev: false,
  };
  status: 'loading' | 'error' | 'success' = 'loading';
  error: string | null = null;
}
