import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription, take } from 'rxjs';
import { PokemonModelInfo } from '../../models/pokemon.model';
import { MatCardModule } from '@angular/material/card';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FavoriteServiceService } from '../../services/favorite-service.service';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-pokemon-screen',
  standalone: true,
  imports: [MatCardModule, NgFor, NgIf, NgClass, FormsModule, MatIcon],
  templateUrl: './pokemon-screen.component.html',
  styleUrl: './pokemon-screen.component.scss'
})
export class PokemonScreenComponent implements OnInit, OnDestroy {
  private pokemonServce = inject(PokemonService);
  protected favoriteService = inject(FavoriteServiceService);
  protected sub = new Subscription();

  readonly = this.favoriteService.favoriteReandonly();
  
  favorites: any[] = [];
  fav = 'favorite_border';

  toggle:boolean = false
  
  pokemon: PokemonModelInfo = {
    name: '',
    url: '',
    height: 0,
    weight: 0,
    types: [],
    abilities: [],
    stats: [],
    exp: '',
    id: ''
  };
  textStats: {[key: string]: string} = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    specialattack: 'SATK',
    specialdefense: 'SDEF',
    speed: 'SPD'
  }
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

  constructor(private route:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(p => {
      const id = p.get('id');

      this.sub = this.pokemonServce.getPokemonById(id!)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          const pokemonFromApi = res ?? null;
          if(pokemonFromApi == null) {
            return;
          }
          this.pokemon = {
            name: res.name.replaceAll("-", " "),
            url: id!,
            height: res.height,
            weight: res.weight,
            types: res.types.map((type: any) => type.type.name),
            abilities: res.abilities.map((ability: any) => ability.ability.name.replaceAll("-", " ")),
            stats: res.stats.map((stat: any) => ({
              base_stat: stat.base_stat,
              name: stat.stat.name.replaceAll("-", ""),
            })),
            exp: res.base_experience,
            id: res.id
          }
        },
        error: err => { 
          console.error('Error fetching posts:', err);
        },
        complete: () => { console.log('Dados Entreguess! pokemon'); this.getFavorites();} 
      });
    });
    
  }

  getFavorites() {
    const data = new Map<string, string>(this.readonly);
    const value = JSON.parse(JSON.stringify(Array.from(data)));

    value.forEach((f:any) => {
      if(f[0] === this.pokemon.id) {
        this.toggle = true;  this.fav ='favorite';
      }
    })
  }

  formatID(number: string) {
    var n = parseInt(number);
    return n.toString().padStart(3, '0');
  }
  getStatWidth(i:number, base_stat: number) {
    var total:number = 0;
    switch(i) {
      case 0:
        total = 255;
        break;
      case 1:
        total = 190;
        break;
      case 2:
        total = 250;
        break;
      case 3:
        total = 194;
        break;
      case 4:
        total = 250;
        break;
      case 5:
        total = 200;
        break;
    }
    var percent = (base_stat / total) * 100;
    // console.log('i');
    return percent;
  }

  toggleFav() {
    this.toggle = !this.toggle
    if(this.toggle) {
      this.fav ='favorite'
      return this.favoriteService.addFavorite(this.pokemon.url, this.pokemon.id);
    } else {
      this.fav = 'favorite_border'
      console.log(this.favorites)
      return this.favoriteService.removeFavorite(this.pokemon.id);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
