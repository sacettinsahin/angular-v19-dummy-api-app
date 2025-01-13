import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // If unauthorized:
      if (error.status === 401) {
        const authService = inject(AuthService);
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            localStorage.setItem('token', newToken.accessToken);

            //second request with new token:
            const clonedReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken.accessToken}`
              }
            });
            return next(clonedReq);
          }),
          catchError((refreshError) => {
            //if refresh token failed -> logout:
            console.error('Refresh token failed. Logging out...');
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
