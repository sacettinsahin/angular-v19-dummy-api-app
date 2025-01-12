import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users.model';

export interface UserResponse{
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  http = inject(HttpClient);

  getUsers():Observable<UserResponse>{
    return this.http.get<UserResponse>('https://dummyjson.com/users')
  }
}
