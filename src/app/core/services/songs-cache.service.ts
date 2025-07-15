import { Injectable } from '@angular/core';
import { SongI } from '../../features/songs-card-list/songs-card-list';
// songs-cache.service.ts

@Injectable({
  providedIn: 'root',
})
export class SongsCacheService {
  private items: SongI[] = [];
  private currentPage = 1;
  private hasMoreData = true;

  getItems(): SongI[] {
    return this.items;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  getHasMoreData(): boolean {
    return this.hasMoreData;
  }

  addItems(newItems: SongI[]): void {
    this.items = [...this.items, ...newItems];
    this.currentPage++;
  }

  setHasMoreData(hasMore: boolean): void {
    this.hasMoreData = hasMore;
  }

  clearCache(): void {
    this.items = [];
    this.currentPage = 1;
    this.hasMoreData = true;
  }
}
