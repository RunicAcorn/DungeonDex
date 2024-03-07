import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(username: string, password: string) {
    return this.http.post<any>('https://dungeonapi.azurewebsites.net/api/users/createuser', { username, password });
  }
}
