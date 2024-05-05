import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { NPC } from './npc';

@Injectable({
  providedIn: 'root'
})
export class NPCService {


  constructor(private http: HttpClient) { }

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/NPC';
  private testApiUrl = 'http://localhost:5082/api/NPC';

  private jwtToken = sessionStorage.getItem('jwtToken');

  getNPCByCampaignId(campaignId: number): Observable<any[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.get<NPC[]>(`${this.testApiUrl}/${campaignId}`, {headers});

  }

  addNPC(NPCData: NPC): Observable<any> {

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.post<NPC>(`${this.testApiUrl}`, NPCData, {headers});
    
  }

  updateNPC(NPC: NPC): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.put( this.testApiUrl, NPC, {headers});
  }

  deleteNPC(NPC: NPC): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.delete(`${this.testApiUrl}/${NPC.id}`, {headers});
  }

}
