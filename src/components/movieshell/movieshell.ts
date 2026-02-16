import { Component, ElementRef, effect, inject, signal, ViewChild } from '@angular/core';
import { MovieService } from '../../app/movie-service';
import { ActivatedRoute } from '@angular/router';
import { MovieList } from '../movielist/movielist';
import { MovieModal } from '../moviemodal/moviemodal';

@Component({
  selector: 'movieshell',
  templateUrl: './movieshell.html',
  imports: [MovieList, MovieModal],
})
export class MovieShell {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);

  @ViewChild('sentinel') sentinelEl!: ElementRef;

  selectedMovie = signal<any | null>(null);

  constructor() {
    effect(() => {
      if (this.selectedMovie()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
  }

  openModal(id: number) {
    this.movieService.getMovieDetails(id).subscribe({
      next: (movie) => this.selectedMovie.set(movie),
      error: (err) => console.error('Failed to load movie details', err),
    });
  }

  movies = signal<any[]>([]);
  currentPage = 1;
  private currentType = '';
  private isLoading = false;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.isLoading && this.movies().length > 0) {
          this.loadNextPage();
        }
      },
      { threshold: 0.1 },
    );

    if (this.sentinelEl) {
      observer.observe(this.sentinelEl.nativeElement);
    }
    this.route.data.subscribe((data) => {
      this.currentType = data['type'];
      this.currentPage = 1;
      this.movies.set([]);
      this.fetchMovies();
    });
  }

  private loadNextPage() {
    this.currentPage++;
    this.fetchMovies();
  }

  private checkAndLoadIfNeeded() {
    setTimeout(() => {
      if (this.sentinelEl && !this.isLoading) {
        const rect = this.sentinelEl.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          this.loadNextPage();
        }
      }
    }, 0);
  }

  private fetchMovies() {
    this.isLoading = true;
    let request$;

    switch (this.currentType) {
      case 'now-playing':
        request$ = this.movieService.getNowPlayingMovies(this.currentPage);
        break;
      case 'popular':
        request$ = this.movieService.getPopularMovies(this.currentPage);
        break;
      case 'top-rated':
        request$ = this.movieService.getTopRatedMovies(this.currentPage);
        break;
      case 'upcoming':
        request$ = this.movieService.getUpcoming(this.currentPage);
        break;
      default:
        request$ = this.movieService.getPopularMovies(this.currentPage);
    }

    request$?.subscribe({
      next: (response) => {
        this.movies.update((currentMovies) => {
          const existingIds = new Set(currentMovies.map((m) => m.id));
          const newMovies = response.results.filter((m: any) => !existingIds.has(m.id));
          return [...currentMovies, ...newMovies];
        });
        this.isLoading = false;

        this.checkAndLoadIfNeeded();
      },
      error: (err) => {
        console.error('Failed to load movies', err);
        this.isLoading = false;
      },
    });
  }
}
