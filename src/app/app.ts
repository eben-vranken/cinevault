import { Component, signal } from '@angular/core';
import { MoviePoster } from '../components/movieposter/movieposter';

@Component({
  selector: 'app-root',
  imports: [MoviePoster],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('cinevault');
}
