import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class NameFetcherService {
  constructor(private httpClient: HttpClient) {}
  getNames(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:5082/api/test`);
  }
}