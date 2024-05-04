import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Campaign } from './campaign.interface';
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/campaign';
  private testUrl = 'http://localhost:5082/api/campaign';

  constructor(private http: HttpClient) { }

  createCampaign(campaign: Campaign) : Observable<any> {
    return this.http.post<Campaign>(this.testUrl, campaign);
  }


  getCampaignsByUserId(userId: string): Observable<Campaign[]> {
    const jwtToken = sessionStorage.getItem('jwtToken');

    // Ensure JWT token exists
    if (!jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`,
      'Content-Type': 'application/json'
    });
    console.log("RErERER" + userId);

    const body = JSON.stringify({ userId });

    return this.http.post<Campaign[]>(this.testUrl + '/Get',   body, { headers});
  }


  deleteCampaign(campaignId: number): Observable<any> {

    const jwtToken = sessionStorage.getItem('jwtToken');

    if (!jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${jwtToken}`
    });

    return this.http.delete<any>(`${this.apiUrl}/${campaignId}`, { headers })
      .pipe(
        catchError(this.handleError)
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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
  
    return throwError(() => new Error(errorMessage));
  }
  
}
