import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/monster';

  private testApiUrl = 'http://localhost:5082/api/monster';
  private jwtToken = sessionStorage.getItem('jwtToken');

  getMonstersByCampaignId(campaignId: number): Observable<any[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any[]>(`${this.testApiUrl}/${campaignId}`, {headers});

  }
}
