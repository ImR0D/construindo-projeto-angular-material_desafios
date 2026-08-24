import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserAuthenticateService {
  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.URL}/users/`);
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.listUsers().pipe(
      map((users) => users.find((user) => user.email === email)),
    );
  }
}
