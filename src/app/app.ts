import { Component, signal } from '@angular/core';
import { Navbar } from '../components/navbar/navbar';
import { RouterOutlet } from '@angular/router';
import { MovieList } from '../components/movielist/movielist';
import { MovieModal } from '../components/moviemodal/moviemodal';

@Component({
  selector: 'app-root',
  imports: [Navbar, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('cinevault');
}
