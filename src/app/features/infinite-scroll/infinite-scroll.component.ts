import {
  catchError,
  finalize,
  Subject,
  Subscription,
  takeUntil,
  of,
} from 'rxjs';
import { IntersectionObserverService } from '../../core/services/observer.service';
import {
  AfterViewInit,
  OnDestroy,
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  Inject,
  PLATFORM_ID,
  ChangeDetectorRef,
  input,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CardListComponent } from '../../shared/components/card/card-list.component';
import { ApiService } from '../../core/services/api.service';
import { SongI, SongRequestT } from '../songs-card-list/songs-card-list';
import { SongsCacheService } from '../../core/services/songs-cache.service';
import { BadgeComponent } from '../../shared/components/badge/badge.component/badge.component';
import { PaginationSkeletonComponent } from '../../shared/skeletons/pagination-skeleton.component';
import { CardItemComponent } from '../../shared/components/card-item/card-item.component';

@Component({
  selector: 'app-infinite-scroll',
  imports: [CardItemComponent, BadgeComponent, PaginationSkeletonComponent],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss',
  standalone: true,
})
export class InfiniteScrollComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  @ViewChild('infiniteScrollAnchor', { static: false }) anchor!: ElementRef;

  items: SongI[] = [];
  loading = signal(false);
  hasMoreData = true;
  currentFilter: any = {};

  private observerSub!: Subscription;
  public currentPage = 1;
  private destroy$ = new Subject<void>();

  options = {
    root: null,
    threshold: 1,
  };

  // infinite-scroll.component.ts
  constructor(
    private observerService: IntersectionObserverService,
    private api_service: ApiService,
    private songsCache: SongsCacheService,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}
  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observerSub = this.observerService
        .createAndObserve(this.anchor, this.options)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            if (this.hasMoreData && !this.loading()) {
              this.loadMore();
            }
          },
        });
    }
  }

  ngOnInit(): void {
    this.items = this.songsCache.getItems();
    this.currentPage = this.songsCache.getCurrentPage();
    this.hasMoreData = this.songsCache.getHasMoreData();

    if (this.items.length === 0) {
      this.loadMore();
    }
  }

  loadMore(): void {
    this.loading.set(true);

    this.api_service
      .getSongs(this.currentFilter?.sort, 'desc', this.currentPage)
      .pipe(
        finalize(() => {
          this.loading.set(false);
        }),
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error loading songs:', error);
          return of({ items: [], hasMore: false });
        })
      )
      .subscribe({
        next: (data: SongRequestT) => {
          if (data.items && data.items.length > 0) {
            this.songsCache.addItems(data.items);
            this.items = [...this.songsCache.getItems()];
            this.cdr.detectChanges();
            this.currentPage = this.songsCache.getCurrentPage();
            console.log('Total items now:', this.items);
          } else {
            this.songsCache.setHasMoreData(false);
            this.hasMoreData = false;
            console.log('No more data available');
          }
        },
      });
  }
  refreshData(): void {
    this.songsCache.clearCache();
    this.items = [];
    this.currentPage = 1;
    this.hasMoreData = true;
    this.loadMore();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.observerSub) {
      this.observerSub.unsubscribe();
    }
  }
  onSortSelected(sortField: string) {
    this.currentFilter = {
      sort: sortField,
      order: 'desc',
    };

    this.refreshData();
  }
  trackById(index: number, item: SongI) {
    return item.id;
  }
}
