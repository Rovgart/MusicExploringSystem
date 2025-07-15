import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SongGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const songId = route.paramMap.get('id');

    // Replace this with your actual validation logic, e.g., check if songId exists in your data source
    const isValidSong = this.isValidSongId(songId);

    if (!isValidSong) {
      // Redirect to home if invalid
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

  private isValidSongId(id: string | null): boolean {
    // Example validation: check if id is not null and matches a known pattern or exists in your data
    // You can replace this with an API call or service check
    if (!id) return false;

    // Example: only allow numeric ids
    return /^\d+$/.test(id);
  }
}
