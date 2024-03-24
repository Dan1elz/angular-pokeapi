import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription, take } from 'rxjs';
import { PokemonTypes } from '../../models/pokemon.model';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-categories-pokemon',
  standalone: true,
  imports: [NgFor, NgIf, CardComponent, MatPaginator, MatButton, NgClass],
  templateUrl: './categories-pokemon.component.html',
  styleUrl: './categories-pokemon.component.scss'
})
export class CategoriesPokemonComponent implements OnInit, OnDestroy {
  protected pokemonService = inject(PokemonService);
  protected sub = new Subscription();
  types: PokemonTypes[] = [
    {
      icon: "normal",
      number: 1
    },
    {
      icon: "fighting",
      number: 2
    },
    {
      icon: "flying",
      number: 3
    },
    {
      icon: "poison",
      number: 4
    },
    {
      icon: "ground",
      number: 5
    },
    {
      icon: "rock",
      number: 6
    },
    {
      icon: "bug",
      number: 7
    },
    {
      icon: "ghost",
      number: 8
    },
    {
      icon: "steel",
      number: 9
    },
    {
      icon: "fire",
      number: 10
    },
    {
      icon: "water",
      number: 11
    },
    {
      icon: "grass",
      number: 12
    },
    {
      icon: "electric",
      number: 13
    },
    {
      icon: "psychic",
      number: 14
    },
    {
      icon: "ice",
      number: 15
    },
    {
      icon: "dragon",
      number: 16
    },
    {
      icon: "dark",
      number: 17
    },
    {
      icon: "fairy",
      number: 18
    },   
  ];

  category: any[] = [];
  pokemon: any[] = []; 
  itemsPerPage: number = 0;
  selectedType: number = 0;

  ngOnInit(): void {
   if(this.category.length === 0) {
    this.getAll(25, 0);
    this.itemsPerPage = 913;
   }
  }
  getAll(limit: number, offset: number) {
    this.category = [];
    this.sub = this.pokemonService.getAllPokemons(limit, offset)
    .subscribe({
      next: (res) => {
        const pokemon = res ?? null;
        if(pokemon == null) 
          return;

        const pokemonArray = pokemon.results as any[];
          
        this.pokemon = pokemonArray.map((pokemon: any) => ({
          name: pokemon.name,
          url: pokemon.url
        }));
      },
      error: err => { console.error('Error fetching posts:', err)},
      complete: () => { console.log('Dados Entregues! content')} 
    });
  }

  gategotyEvent(i: number) {
    this.selectedType = i;
    this.pokemon = [];
    this.itemsPerPage = 0;

    this.getCategoryType(this.selectedType, 25, 0);
  }
  getCategoryType(i: number, limit: number, offset: number) {
    console.log(i)

    this.sub = this.pokemonService.getCategoryType(i)
    .subscribe({
      next: (res) => {
        const pokemon = res ?? null;
        if(pokemon == null) 
          return;

        const pokemonArray = pokemon as any[];
        this.itemsPerPage = pokemonArray.length;
        const limitPokemons = pokemonArray.slice(offset, limit+offset);

        this.category = limitPokemons.map((pokemon: any) => ({
          name: pokemon.name,
          url: pokemon.url
        }));
      },
      error: err => { console.error('Error fetching posts:', err)},
      complete: () => { console.log('Dados Entregues! content')} 
    })
  }

  onPageChange(event: any) {
    const i = event.pageIndex * event.pageSize;
    if(this.category.length === 0)
      this.getAll(event.pageSize, i);
    else
      this.getCategoryType(this.selectedType, event.pageSize, i);
  }
  clearFilters() {
    this.selectedType = 0;
    this.itemsPerPage = 913;
    this.getAll(25, 0);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
