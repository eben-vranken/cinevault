import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.html',
  imports: [RouterLink, RouterLinkActive, CommonModule],
})
export class Navbar {
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  onGenreChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    if (value) {
      window.location.href = '/genre/' + value;
    }
  }
}
