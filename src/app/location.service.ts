import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Location } from './location';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  constructor(private http: HttpClient) { }


  private testApiUrl = 'http://localhost:5082/api/location';

  private jwtToken = sessionStorage.getItem('jwtToken');

  getLocationByCampaignId(campaignId: number): Observable<any[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.get<Location[]>(`${this.testApiUrl}/${campaignId}`, {headers});

  }

  addLocation(locationData: Location): Observable<any> {

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.post<Location>(`${this.testApiUrl}`, locationData, {headers});
    
  }

  updateLocation(location: Location): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.put( this.testApiUrl, location, {headers});
  }

  deleteLocation(location: Location): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.delete(`${this.testApiUrl}/${location.id}`, {headers});
  }

}
