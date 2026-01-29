import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
// 1. IMPORTUJEMY STWORZONY INTERCEPTOR
import { authInterceptor } from './services/auth/auth.interceptor'; 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    
    // 2. REJESTRUJEMY INTERCEPTOR W TABLICY
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])) 
  ]
};