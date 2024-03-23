import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FavoriteServiceService } from './services/favorite-service.service';

const appInicializerProvider = (FavoriteServiceService: FavoriteServiceService) => {
  return () => {
    FavoriteServiceService.trySyncLocalStorage()
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: appInicializerProvider,
      deps: [FavoriteServiceService],
      multi: true,
    }, provideAnimationsAsync()
  ],
};
