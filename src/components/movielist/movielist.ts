import { Component, input } from "@angular/core";
import { MoviePoster } from "../movieposter/movieposter";

@Component({
    selector: 'movielist',
    templateUrl: './movielist.html',
    imports: [MoviePoster]
})
export class MovieList {
    movies = input.required<any[]>();
}