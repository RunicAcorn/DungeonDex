import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  //private apiUrl = 'http://localhost:5000/api/chapter'; // Adjust to match your API
  private jwtToken = sessionStorage.getItem('jwtToken');

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/chapter';

  private testApiUrl = 'http://localhost:5082/api/chapter';
  

  constructor(private http: HttpClient) { }


  

  getChaptersByCampaignId(campaignId: number): Observable<any> {

    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  

    return this.http.get<any[]>(`${this.testApiUrl}/${campaignId}`, {headers});
  }

  getLatestChapterOrder(campaignId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.http.get<any>(`${this.testApiUrl}/${campaignId}/latest`, {headers});
  }

  addChapter(chapterData: { campaignId: number, title: string, order: number }): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });


    return this.http.post<any>(`${this.testApiUrl}`, chapterData, {headers})
    .pipe(
      catchError(this.handleError)
    );;
  }

  deleteChapter(campaignId: number, chapterId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    // Set headers with JWT token for authentication
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.delete<any>(`${this.testApiUrl}/${campaignId}/${chapterId}`, { headers })
      .pipe(
        catchError(this.handleError)
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