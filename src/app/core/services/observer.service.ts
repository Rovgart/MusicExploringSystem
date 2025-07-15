import { ElementRef, Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, mergeMap, map, distinctUntilChanged } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntersectionObserverService {
  observer: IntersectionObserver | undefined;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  createAndObserve(
    element: ElementRef,
    options?: IntersectionObserverInit
  ): Observable<boolean> {
    return new Observable<IntersectionObserverEntry[]>((observer) => {
      const intersectionObserver = new IntersectionObserver((entries) => {
        console.log(entries);
        observer.next(entries); // entries to tablica!
      }, options);

      intersectionObserver.observe(element.nativeElement);
      console.log(element);
      return () => {
        intersectionObserver.disconnect();
      };
    }).pipe(
      mergeMap((entries) => entries),
      map((entry) => entry.isIntersecting),
      distinctUntilChanged()
    );
  }
}
