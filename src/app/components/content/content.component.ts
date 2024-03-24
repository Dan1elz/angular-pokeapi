import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Subscription } from 'rxjs';
import { NgFor } from '@angular/common';
import { CardComponent } from '../card/card.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
  selector: 'app-content', 
  standalone: true,
  imports: [NgFor, CardComponent,MatPaginatorModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss'
})
export class ContentComponent implements OnInit, OnDestroy {
  protected pokemonService = inject(PokemonService);
  protected sub = new Subscription();

  pokemon: any[] = [];

  ngOnInit(): void {
   this.getAll(25, 0);
  }

  getAll(limit: number, offset: number) {
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
  onPageChange(event: any) {
    const i = event.pageIndex * event.pageSize;
    this.getAll(event.pageSize, i);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
