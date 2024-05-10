import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Quest } from './quest';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(private httpclient: HttpClient) { }



  private testApiUrl = 'http://localhost:5082/api/quest';
  private jwtToken = sessionStorage.getItem('jwtToken');

  getQuestsByCampaignId(campaignId: number): Observable<any[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.get<Quest[]>(`${this.testApiUrl}/${campaignId}/all`, {headers});

  }

  getQuestById(questId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.get<Quest>(`${this.testApiUrl}/${questId}`, {headers});

  }

  createQuest(questData: Quest): Observable<any> {
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.jwtToken}`
      });
  
      return this.httpclient.post<Quest>(`${this.testApiUrl}`, questData, {headers});
      
    }

  updateQuest(questData: Quest): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.httpclient.put( this.testApiUrl, questData, {headers});
  }

  deleteQuest(questData: Quest): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
    return this.httpclient.delete(`${this.testApiUrl}/`+ questData.id,  {headers});
  }

}
