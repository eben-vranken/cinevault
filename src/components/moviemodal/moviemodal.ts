import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'moviemodal',
  templateUrl: './moviemodal.html',
})
export class MovieModal {
  @Input({ required: true }) moviePosterURL!: string;

  @Input({ required: true }) movieName!: string;
  @Input({ required: true }) movieTagline!: string;
  @Input({ required: true }) movieDescription!: string;
  @Input({ required: true }) movieRating!: number;

  @Input({ required: true }) movieGenres!: { id: number; name: string }[];
  @Input({ required: true }) movieReleaseDate!: string;
  @Input({ required: true }) movieRuntime!: number;
  @Input({ required: true }) movieLanguage!: string;
  @Input({ required: true }) movieBudget!: number;
  @Input({ required: true }) movieRevenue!: number;
  @Input({ required: true }) movieProductionHouses!: { id: number; name: string }[];
  @Input({ required: true }) imdbId!: string;
  @Input({ required: true }) movieId!: number;

  @Output() close = new EventEmitter<void>();
}
