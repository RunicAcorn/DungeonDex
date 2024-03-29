import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Campaign } from './campaign.interface';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/campaign';

  constructor(private http: HttpClient) { }

  createCampaign(campaign: Campaign) : Observable<any> {
    return this.http.post<any>('https://dungeonapi.azurewebsites.net/api/campaign/create', { campaign });
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

 deleteCampaign(campaignId: number): Observable<void> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (!jwtToken) {
      throw new Error('JWT token not found in session storage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    const url = `https://dungeonapi.azurewebsites.net/api/campaign/${campaignId}`;
   return this.http.delete<void>(url, { headers })
    .pipe(
      catchError(error => {
        console.error('Error deleting campaign:', error);
        throw error;
      })
    );
  }

   updateCampaign(campaignId: string, campaignData: Partial<Campaign>): Observable<Campaign> {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (!jwtToken) {
      throw new Error('JWT token not found in session storage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json' // Specify content type as JSON
    });

    const url = `${this.apiUrl}/${campaignId}`;


    return this.http.put<Campaign>(url, campaignData, { headers })
      .pipe(
        catchError(error => {
          console.error('Error updating campaign:', error);
          return throwError(() => new Error('Error updating campaign'));
        })
      );
  }
  
}
