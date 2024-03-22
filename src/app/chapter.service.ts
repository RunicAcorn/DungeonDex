import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private apiUrl = 'http://localhost:5000/api/chapter'; // Adjust to match your API

  constructor(private http: HttpClient) { }

  getChaptersByCampaignId(campaignId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${campaignId}`);
  }

  addChapter(chapterData: { campaignId: number, title: string, order: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, chapterData);
  }

  
}