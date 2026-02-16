import { Routes } from '@angular/router';
import { MovieShell } from '../components/movielist/movieshell';

export const routes: Routes = [
  { path: '', redirectTo: 'popular', pathMatch: 'full' },

  { path: 'popular', component: MovieShell, data: { type: 'popular' } },
  { path: 'now-playing', component: MovieShell, data: { type: 'now-playing' } },
  { path: 'top-rated', component: MovieShell, data: { type: 'top-rated' } },
  { path: 'upcoming', component: MovieShell, data: { type: 'upcoming' } },
];
