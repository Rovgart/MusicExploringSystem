import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { InputFieldComponent } from '../../shared/components/input/input.component';
import { ApiService } from '../../core/services/api.service';
import { SearchItemComponent } from '../search-item/search-item.component';
import { SongRequestT } from '../songs-card-list/songs-card-list';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Subject, takeUntil, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'search-bar',
  imports: [InputFieldComponent, SearchResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  standalone: true,
})
export class SearchComponent implements OnDestroy {
  searchResults: SongRequestT | null = null;
  isLoading = false;
  errorMessage = '';

  private timeout: any;
  private destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  onSearchChange(searchTerm: string): void {
    console.log(`User searched for: ${searchTerm}`);

    if (!searchTerm.trim()) {
      this.searchResults = null;
      this.errorMessage = '';
      clearTimeout(this.timeout);
      return;
    }

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.performSearch(searchTerm.trim());
    }, 500);
  }

  private performSearch(term: string): void {
    if (!term) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.apiService
      .searchSongs(term)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Search error:', error);
          this.errorMessage = 'Failed to search songs. Please try again.';
          return of(null);
        })
      )
      .subscribe({
        next: (data: SongRequestT | null) => {
          this.searchResults = data;
          this.isLoading = false;
          this.cdr.detectChanges();
          if (data) {
            console.log('Search results:', data);
          }
        },
        error: (error) => {
          console.error('Unexpected error:', error);
          this.errorMessage = 'An unexpected error occurred.';
          this.isLoading = false;
        },
      });
  }

  clearSearch(): void {
    this.searchResults = null;
    this.errorMessage = '';
    clearTimeout(this.timeout);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearTimeout(this.timeout);
  }
}
