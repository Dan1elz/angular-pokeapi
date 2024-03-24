import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-search-pokemon',
  standalone: true,
  imports: [NgFor, CardComponent, MatIcon, FormsModule, NgIf, MatPaginator],
  templateUrl: './search-pokemon.component.html',
  styleUrl: './search-pokemon.component.scss'
})
export class SearchPokemonComponent implements OnInit, OnDestroy {
  protected pokemonService = inject(PokemonService);
  protected sub = new Subscription();

  pokemon: any[] = [];
  searchs: any [] = [];
  search:string = '';
  max: number = 0;

  ngOnInit(): void {
    if(this.searchs.length === 0) {
     this.getAll(25, 0);
     this.max = 913;
    }
   }
  getAll(limit: number, offset: number) {
    this.searchs = [];
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
  submit(event: any) {
    if(this.search === '')
      return this.getAll(25,0);

    this.pokemon = [];
    this.max = 0;
    this.searchPokemon(this.search, 25, 0)
  }
  searchPokemon(name: string, limit: number, offset: number) {
    this.sub = this.pokemonService.searchPokemon(name)
    .subscribe({
      next: (res) => {
        const pokemon = res ?? null;
        if(pokemon == null)
          return;
        
        const pokemonArray = pokemon as any[];
        this.max = pokemonArray.length;
        const limitPokemons = pokemonArray.slice(offset, limit+offset);
        
        this.searchs = limitPokemons.map((pokemon: any) => ({
          name: pokemon.name,
          url: pokemon.url
        }));

      },
      error: err => { console.error('Error fetching posts:', err)},
      complete: () => { console.log('Dados Entregues! content')} 
    });
  }

  onPageChange(event: any) {
    const i = event.pageIndex * event.pageSize;

    if(this.searchs.length === 0)
      this.getAll(event.pageSize, i);
    else {
      console.log(event.pageSize, i)
      this.searchPokemon(this.search, event.pageSize, i);
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}

