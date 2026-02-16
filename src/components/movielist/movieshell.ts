import { Component, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { MovieService } from '../../app/movie-service';
import { ActivatedRoute } from '@angular/router';
import { MovieList } from './movielist';

@Component({
  selector: 'movieshell',
  templateUrl: './movieshell.html',
  imports: [MovieList],
})
export class MovieShell {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);

  @ViewChild('sentinel') sentinelEl!: ElementRef;

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

    // 2. Handle Route Changes
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
    // Defer check to next tick to allow DOM to update
    setTimeout(() => {
      if (this.sentinelEl && !this.isLoading) {
        const rect = this.sentinelEl.nativeElement.getBoundingClientRect();
        // If sentinel is visible in viewport, load next page
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
        this.movies.update((currentMovies) => [...currentMovies, ...response.results]);
        this.isLoading = false;

        // Check if sentinel is still visible after loading, and load more if needed
        this.checkAndLoadIfNeeded();
      },
      error: (err) => {
        console.error('Failed to load movies', err);
        this.isLoading = false;
      },
    });
  }
}
