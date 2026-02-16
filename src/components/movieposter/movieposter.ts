import { Component, Input } from "@angular/core";

@Component({
  selector: "movieposter",
  templateUrl: "./movieposter.html",
})
export class MoviePoster {
  @Input({required: true}) movieName!: string;
  @Input({required: true}) moviePosterURL!: string;
  @Input({required: false}) movieRating?: number;
}