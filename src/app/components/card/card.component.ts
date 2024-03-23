import { Component, Input, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription, take } from 'rxjs';
import {MatCardModule} from '@angular/material/card';
import { PokemonModelCard, PokemonModelInfo } from '../../models/pokemon.model';
import { NgClass, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FavoriteServiceService } from '../../services/favorite-service.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, NgFor, MatIconModule, NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit, OnDestroy {
  private pokemonService = inject(PokemonService);
  protected favoriteService = inject(FavoriteServiceService);
  private router = inject(Router);
  protected sub = new Subscription();

  readonly = this.favoriteService.favoriteReandonly();
  
  @Input() url: string ='';

  isHovered:boolean = false;

  favorites: any[] = [];
  fav = 'favorite_border';

  toggle:boolean = false
  
  pokemon: PokemonModelCard = {
    name: '',
    url: '',
    types: [],
    exp: '',
    id: ''
  };

  typeIcons: { [key: string]: string } = {
    normal: 'normal',
    fire: 'fire',
    water: 'water',
    electric: 'electric',
    grass: 'grass', 
    ice: 'ice',
    fighting: 'fighting', 
    poison: 'poison',
    ground: 'ground',
    flying: 'flying', 
    psychic: 'psychic',
    bug: 'bug',
    rock: 'rock',
    ghost: 'ghost',
    dragon: 'dragon',
    dark: 'dark',
    steel: 'steel',
    fairy: 'fairy'
  };

  ngOnInit(): void {
    this.sub = this.pokemonService.getPokemonById(this.url)
    .pipe(take(1))
    .subscribe({
      next: (res) => {
        const pokemonFromApi = res ?? null;
        if(pokemonFromApi == null) {
          return;
        }
        this.pokemon = {
          name: res.name.replaceAll("-", " "),
          url: this.url,
          types: res.types.map((type: any) => type.type.name),
          exp: res.base_experience,
          id: res.id
        };
      },
      error: err => { 
        console.error('Error fetching posts:', err);
      },
      complete: () => { console.log('Dados Entreguess! card'); this.getFavorites();} 
    });
  }
  openPokemon() {
    this.router.navigate(['/pokemon'], { queryParams: { id: this.url } });
  }  
  formatID(number: string) {
    var n = parseInt(number);
    return n.toString().padStart(3, '0');
  }
  getFavorites() {
    const data = new Map<string, string>(this.readonly);
    const value = JSON.parse(JSON.stringify(Array.from(data)));

    value.forEach((f:any) => {
      if(f[0] === this.pokemon.id) {
        this.toggle = true;
        this.fav = 'favorite';
        this.isHovered = true; 
      }
    })
  }

  toggleFav(event: Event): void {
    event.stopPropagation();
    this.toggle = !this.toggle
    if(this.toggle) {
      this.fav ='favorite'
      return this.favoriteService.addFavorite(this.pokemon.url, this.pokemon.id);
    } else {
      this.fav = 'favorite_border'
      return this.favoriteService.removeFavorite(this.pokemon.id);
    }
  }
  toggleCard(): void {
    if(this.toggle) {return;}
    this.isHovered = !this.isHovered; 
}
  ngOnDestroy(): void {
     this.sub.unsubscribe();
  }
}
