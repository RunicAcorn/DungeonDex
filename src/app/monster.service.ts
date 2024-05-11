import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Monster } from './monster.interface';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {

  constructor(private http: HttpClient) { }



  private testApiUrl = 'http://localhost:5082/api/monster';
  private jwtToken = sessionStorage.getItem('jwtToken');

getMonsterById(monsterId: number): Observable<Monster> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.get<Monster>(`${this.testApiUrl}/select/${monsterId}`, {headers});
}


  getMonstersByCampaignId(campaignId: number): Observable<Monster[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<Monster[]>(`${this.testApiUrl}/${campaignId}`, {headers});

  }

  updateMonster( monster: Monster): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.http.put( this.testApiUrl, monster, {headers});
  }

  addMonster(monsterData: Monster): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.post<Monster>(`${this.testApiUrl}`, monsterData, {headers});
    
  }

  deleteMonster(monsterData: Monster): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.http.delete(`${this.testApiUrl}/`+ monsterData.id,  {headers});
  }
}
