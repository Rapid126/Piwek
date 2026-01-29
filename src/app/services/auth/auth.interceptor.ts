import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Pobieramy token z "sejfu" przeglądarki
  const token = localStorage.getItem('token');

  if (token) {
    // Jeśli token istnieje, klonujemy zapytanie i dodajemy nagłówek
    const authReq = req.clone({
      setHeaders: {
        'x-auth-token': `Bearer ${token}`
      }
    });
    return next(authReq);
  }

  // Jeśli nie ma tokena, puszczamy zapytanie bez zmian
  return next(req);
};