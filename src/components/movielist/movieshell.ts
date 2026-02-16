import { Component, inject, signal } from "@angular/core";
import { MovieService } from "../../app/movie-service";
import { ActivatedRoute } from "@angular/router";
import { MovieList } from "./movielist";

@Component({
    selector: 'movieshell',
    templateUrl: './movieshell.html',
    imports: [MovieList]
})
export class MovieShell {
    private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute) 
  
  movies = signal<any[]>([]);

  ngOnInit() {
    this.route.data.subscribe({
      next: (data) => {
        const type = data['type'];

        this.fetchMoviesByCategory(type);
      }
    })
  }

  private fetchMoviesByCategory(type: string) {
    let request$;

    switch (type) {
      case 'now-playing':
        request$ = this.movieService.getNowPlayingMovies();
        break;
      case 'popular':
        request$ = this.movieService.getPopularMovies();
        break;
      case 'top-rated':
        request$ = this.movieService.getTopRatedMovies();
        break;
      case 'upcoming':
        request$ = this.movieService.getUpcoming();
        break;
      default:
        request$ = this.movieService.getPopularMovies();
    }

    request$?.subscribe({
      next: (response) => {
        this.movies.set(response.results);
      },
      error: (err) => console.error('Failed to load movies', err)
    })
  }
}