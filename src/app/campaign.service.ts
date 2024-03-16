import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Campaign } from './campaign.interface';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor(private http: HttpClient) { }

  createCampaign(Campaign: Campaign) : Observable<any> {
    return this.http.post<any>('https://dungeonapi.azurewebsites.net/api/campaign/create', { Campaign });
  }
  getCampaignsByUserId(userId: string): Observable<Campaign[]> {
    const jwtToken = sessionStorage.getItem('jwtToken');

    // Ensure JWT token exists
    if (!jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });
  


    return this.http.get<Campaign[]>('https://dungeonapi.azurewebsites.net/api/campaign/campaigns',{ 
      headers
      });
  }
  
}
