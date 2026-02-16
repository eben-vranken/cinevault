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
  public getNowPlayingMovies(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/now_playing?page=${page}`, {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Movies ordered by popularity
  public getPopularMovies(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Movies ordered by rating
  public getTopRatedMovies(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Upcoming movies
  public getUpcoming(page: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/upcoming?page=${page}`, {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }

  // Specific movie details
  public getMovieDetails(movieId: number): Observable<any> {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
      headers: {
        Authorization: environment.tmdbToken,
      },
    });
  }
}
