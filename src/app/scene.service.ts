import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SceneService {

  constructor(private http: HttpClient) { }

  private sceneSource = new BehaviorSubject(null);
  currentScene = this.sceneSource.asObservable();

  selectScene(scene: any) {
    this.sceneSource.next(scene);
  }

  private jwtToken = sessionStorage.getItem('jwtToken');

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/scene';
 
  private testUrl = 'http://localhost:5082/api/scene';


  addScene(sceneData: { chapterId: number, title: string, description: string, order: number }): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.post<any>(`${this.apiUrl}`, sceneData, {headers})
    .pipe(
      catchError(this.handleError)
    );;  
  }

  getSceneById(sceneId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(`${this.apiUrl + '/scene'}/${sceneId}`, {headers});
  }

  deleteScene(chapterId: number, sceneId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.delete<any>(`${this.apiUrl}/${chapterId}/${sceneId}`, { headers })
    .pipe(
      catchError(this.handleError)
    );
  }

  getLatestSceneOrder(sceneId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.http.get<any>(`${this.apiUrl}/${sceneId}/latest`, {headers});
  }

  getScenes(chapterId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(`${this.apiUrl}/${chapterId}`, {headers});
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