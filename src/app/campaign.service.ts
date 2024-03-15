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
}
