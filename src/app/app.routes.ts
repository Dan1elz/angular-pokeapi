import { Routes } from '@angular/router';
import { ContentComponent } from './components/content/content.component';
import { PokemonScreenComponent } from './components/pokemon-screen/pokemon-screen.component';
import { SearchPokemonComponent } from './components/search-pokemon/search-pokemon.component';
import { CategoriesPokemonComponent } from './components/categories-pokemon/categories-pokemon.component';
import { FavoritesPokemonComponent } from './components/favorites-pokemon/favorites-pokemon.component';

export const routes: Routes = [
    {
        path: '',
        component: ContentComponent
    },
    {
        path: 'pokemon',
        component: PokemonScreenComponent
    },
    {
        path: 'search',
        component: SearchPokemonComponent
    },
    {
        path: 'categories',
        component: CategoriesPokemonComponent
    },
    {
        path: 'favorites',
        component: FavoritesPokemonComponent
    }
];
