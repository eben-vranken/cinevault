import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'movieposter',
  templateUrl: './movieposter.html',
})
export class MoviePoster {
  @Input({ required: true }) id!: number;
  @Input({ required: true }) movieName!: string;
  @Input({ required: true }) moviePosterURL!: string;
  @Input({ required: true }) movieRating!: number;
  @Output() movieClicked = new EventEmitter<number>();
}
