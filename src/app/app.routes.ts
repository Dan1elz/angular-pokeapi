import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';

export const routes: Routes = [
    {
        path: '',
        component: ContentComponent
      },
      {
        path: 'pokemon',
        loadComponent: () => import('./components/pokemon-screen/pokemon-screen.component').then(mod => mod.PokemonScreenComponent)
      },
      {
        path: 'search',
        loadComponent: () => import('./components/search-pokemon/search-pokemon.component').then(mod => mod.SearchPokemonComponent)
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories-pokemon/categories-pokemon.component').then(mod => mod.CategoriesPokemonComponent)
      },
      {
        path: 'favorites',
        loadComponent: () => import('./components/favorites-pokemon/favorites-pokemon.component').then(mod => mod.FavoritesPokemonComponent)
      }
];
