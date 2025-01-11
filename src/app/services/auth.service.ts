import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);

  login(username: string, password: string): Observable<Auth> {
    return this.http.post<Auth>('https://dummyjson.com/auth/login', {
      username,
      password,
    });
  }

  constructor() {}
}
