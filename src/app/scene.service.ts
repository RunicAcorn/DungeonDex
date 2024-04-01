import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor(private http: HttpClient) { }

  private jwtToken = sessionStorage.getItem('jwtToken');

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/scene';
 
  private testUrl = 'http://localhost:5082/api/scene';

  addScene(sceneData: { chapterId: number, description: string, order: number }): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });


    return this.http.post<any>(`${this.testUrl}`, sceneData, {headers})
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