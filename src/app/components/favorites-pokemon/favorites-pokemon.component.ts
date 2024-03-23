import { Component, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { FavoriteServiceService } from '../../services/favorite-service.service';
import { CardComponent } from '../card/card.component';
import { NgFor } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-favorites-pokemon',
  standalone: true,
  imports: [CardComponent,NgFor, MatPaginator],
  templateUrl: './favorites-pokemon.component.html',
  styleUrl: './favorites-pokemon.component.scss'
})
export class FavoritesPokemonComponent implements OnInit, OnDestroy {
  protected favoriteService = inject(FavoriteServiceService);
  protected sub = new Subscription();
  readonly:any = this.favoriteService.favoriteReandonly;


  max: number = 0;
  favorites: any[] = [];

  ngOnInit(): void {
    this.getFavorites(25, 0)
  }
  constructor() {
    effect(() => {
      console.log(this.readonly());
      this.getFavorites(25, 0);
    });
  }

  getFavorites(limit: number, offset: number) {
    const data = new Map<string, string>(this.readonly());
    const pokemonArray = JSON.parse(JSON.stringify(Array.from(data))) as any[];
    
    this.max = pokemonArray.length;
    const limitPokemons = pokemonArray.slice(offset, limit + offset);

    this.favorites = limitPokemons.map((pokemon: any[]) => ({
        url: pokemon[1]
    }));
}
       
  onPageChange(event: any) {
    const i = event.pageIndex * event.pageSize;
    console.log(event.pageSize, i)
    this.getFavorites(event.pageSize, i);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
