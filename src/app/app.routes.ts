import { Routes } from '@angular/router';
import { SongDetails } from './pages/song-details';
import { Home } from './pages/home/home';
import { SongGuard } from './core/guards/song-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: Home,
  },
  {
    path: 'song/:id',
    component: SongDetails,
    canActivate: [SongGuard],
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
