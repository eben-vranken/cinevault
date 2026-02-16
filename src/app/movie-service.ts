import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http: HttpClient = inject(HttpClient);

  // Movies currently in playing in theatres
  public getNowPlayingMovies(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/now_playing', {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Movies ordered by popularity
  public getPopularMovies(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/popular', {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Movies ordered by rating
  public getTopRatedMovies(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/top_rated', {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Upcoming movies
  public getUpcoming(): Observable<any> {
    return this.http.get('https://api.themoviedb.org/3/movie/upcoming', {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }
}
