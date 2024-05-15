import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  testApiUrl = 'http://localhost:5082/api/users';
  constructor(private http: HttpClient) { }

  createUser(username: string, password: string) {
    return this.http.post<any>(this.testApiUrl + '/createuser', { username, password });
  }
  loginUser(username: string, password: string) {
    //return this.http.post<any>('http://localhost:5082/api/users/login', { username, password });
    return this.http.post<any>(this.testApiUrl+ '/login', { username, password });
  }
 getUsername(): Observable<string> {
  const jwtToken = sessionStorage.getItem('jwtToken');

  // Ensure JWT token exists
  if (!jwtToken) {
    throw new Error('JWT token not found in session storage.');
  } 

  // Set headers with JWT token for authentication
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${jwtToken}`
  });

  return this.http.get<string>(this.testApiUrl+ `/username`, { 
    headers
    });
  
  }
}
