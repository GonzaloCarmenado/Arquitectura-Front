import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { GeneralHttpInterceptorService } from 'general-http-interceptor'

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      BrowserAnimationsModule,
    ),
     provideHttpClient(
      withInterceptors([GeneralHttpInterceptorService]),
    ),
  ]
};
