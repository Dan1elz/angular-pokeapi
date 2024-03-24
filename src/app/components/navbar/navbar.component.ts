import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule, 
    MatToolbarModule, 
    MatFormFieldModule, 
    FormsModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);
  pokemons() {
    this.router.navigate(['']);
  }
  search() {
    this.router.navigate(['search']);
  }
  categories() {
    this.router.navigate(['categories']);
  }
  favorites() {
    this.router.navigate(['favorites']);
  }
}
