import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient);
  protected router = 'https://pokeapi.co/api/v2';



  getAllPokemons(limit: number, offset: number): Observable<any> {
    return this.http.get<any>(`${this.router}/pokemon?limit=${limit}}&offset=${offset}`);
  }
  getPokemonById(url: string) : Observable<any> {
    return this.http.get<any>(url);
  }
  searchPokemon(name: string) : Observable<any> {
    return this.http.get<any>(`${this.router}/pokemon?limit=1200&offset=0`)
    .pipe(
      map((response: any) => {
        return response.results.filter((pokemon: any) =>
          pokemon.name.toLowerCase().startsWith(name.toLowerCase())
        );
      })
    );
  }
  getCategoryType(i: number): Observable<any> {
    return this.http.get<any>(`${this.router}/type/${i}`).pipe(
      map((response: any) => response.pokemon.map((item: any) => item.pokemon))
    );
  }
}
