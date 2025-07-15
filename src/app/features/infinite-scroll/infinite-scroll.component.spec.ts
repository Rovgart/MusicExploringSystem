import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfiniteScrollComponent } from './infinite-scroll.component';
import { ApiService } from '../../core/services/api.service';
import { SongsCacheService } from '../../core/services/songs-cache.service';
import { IntersectionObserverService } from '../../core/services/observer.service';
import { of, Subject } from 'rxjs';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { SongI } from '../songs-card-list/songs-card-list';

// Mock data
const mockSongs: SongI[] = [
  { id: 1, name: 'Song A' } as SongI,
  { id: 2, name: 'Song B' } as SongI,
];

// Mock Services
class MockApiService {
  getSongs(sort?: string, order: string = 'desc', page: number = 1) {
    return of({
      items: mockSongs,
      hasMore: true,
    });
  }
}

class MockCacheService {
  items: SongI[] = [];
  public currentPage = 1;
  private hasMoreData = true;

  getItems() {
    return this.items;
  }

  addItems(newItems: any[]) {
    this.items = [...this.items, ...newItems];
  }

  getCurrentPage() {
    return this.currentPage;
  }

  getHasMoreData() {
    return this.hasMoreData;
  }

  setHasMoreData(value: boolean) {
    this.hasMoreData = value;
  }

  clearCache() {
    this.items = [];
    this.currentPage = 1;
    this.hasMoreData = true;
  }
}

class MockObserverService {
  createAndObserve() {
    return of(true); // simulate intersection trigger
  }
}

describe('InfiniteScrollComponent', () => {
  let component: InfiniteScrollComponent;
  let fixture: ComponentFixture<InfiniteScrollComponent>;
  let apiService: ApiService;
  let cacheService: SongsCacheService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfiniteScrollComponent],
      providers: [
        { provide: ApiService, useClass: MockApiService },
        { provide: SongsCacheService, useClass: MockCacheService },
        { provide: IntersectionObserverService, useClass: MockObserverService },
        { provide: PLATFORM_ID, useValue: 'browser' },
        provideZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InfiniteScrollComponent);
    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService);
    cacheService = TestBed.inject(SongsCacheService);
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load songs on init if cache is empty', () => {
    const spy = spyOn(apiService, 'getSongs').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalledWith(undefined, 'desc', 1);
    expect(component.items.length).toBeGreaterThan(0);
  });

  it('should stop loading if already loading', () => {
    component.loading.set(true);
    const spy = spyOn(apiService, 'getSongs');
    component.loadMore();
    expect(spy).not.toHaveBeenCalled();
    component.loading.set(false); // clean up state
  });

  it('should set hasMoreData to false if no songs returned', () => {
    spyOn(apiService, 'getSongs').and.returnValue(
      of({ items: [], hasMore: false })
    );
    component.loadMore();
    expect(component.hasMoreData).toBeFalse();
  });

  it('should clear data and reload on refresh', () => {
    const spy = spyOn(apiService, 'getSongs').and.callThrough();
    component.refreshData();
    expect(component.items.length).toBeGreaterThan(0);
    expect(component.currentPage).toBe(1);
    expect(spy).toHaveBeenCalled();
  });

  it('should unsubscribe observer on destroy', () => {
    const destroySpy = spyOn(
      (component as any).destroy$,
      'next'
    ).and.callThrough();
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
