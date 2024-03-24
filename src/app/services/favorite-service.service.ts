import {Injectable, computed, effect, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteServiceService {
  private favorites = new Map<string, string>();
 
  private favoriteSignal = signal<any>(null);
  favoriteReandonly = this.favoriteSignal.asReadonly();
  favoriteComputed = computed(() => {
    return this.favoriteSignal()
  });

  constructor() {
    effect(() => {
      const data = new Map<string, string>(this.favoriteReandonly());
      const value = JSON.stringify(Array.from(data));
      this.syncLocalStorage(value)
      })
    }
 
  addFavorite(url: string, id: string): void {
    if (this.checkUrlExists(url)) {
      console.log(`A URL ${url} já existe nos favoritos.`);
      return;
    }
    this.favorites.set(id, url);
    var array:any[] = Array.from(this.favorites.entries());
    this.favoriteSignal.update(set => array);
  }

  removeFavorite(id: string): void {
    if (!this.checkIdExists(id)) {
      console.log(`O ID ${id} não existe na lista de favoritos.`);
      return;
    }
    this.favorites.delete(id);
    var array:any[] = Array.from(this.favorites.entries());
    this.favoriteSignal.update(set => array);
  }

  private checkIdExists(id: string): boolean {
    return this.favorites.has(id);
  }

  private checkUrlExists(urlToCheck: string): boolean {
    return Array.from(this.favorites.values()).includes(urlToCheck);
  }

  syncLocalStorage(value: string) {
    localStorage.setItem('Favorites', value);
  }
  trySyncLocalStorage() {
    let lsData = localStorage.getItem('Favorites');

    if(!lsData) 
      return;

    let dataArray = JSON.parse(lsData);

    dataArray.forEach((f: any) => {
      this.addFavorite(f[1], f[0])
    });
  }
}
