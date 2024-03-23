import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  //private apiUrl = 'http://localhost:5000/api/chapter'; // Adjust to match your API

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/chapter';

  constructor(private http: HttpClient) { }

  getChaptersByCampaignId(campaignId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${campaignId}`);
  }

  addChapter(chapterData: { campaignId: number, title: string, order: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, chapterData)
    .pipe(
      catchError(this.handleError)
    );;
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