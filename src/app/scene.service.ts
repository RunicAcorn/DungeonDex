import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Narrative } from './scene';

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


 
  private testUrl = 'http://localhost:5082/api/scene';


  addScene(sceneData: { chapterId: number, title: string, description: string, order: number }): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.post<any>(`${this.testUrl}`, sceneData, {headers})
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

    return this.http.get<any>(`${this.testUrl + '/scene'}/${sceneId}`, {headers});
  }

  deleteScene(chapterId: number, sceneId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.delete<any>(`${this.testUrl}/${chapterId}/${sceneId}`, { headers })
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
  
    return this.http.get<any>(`${this.testUrl}/${sceneId}/latest`, {headers});
  }

  getScenes(chapterId: number): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.http.get<any>(`${this.testUrl}/${chapterId}`, {headers});
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

  updateNarrative(newNarrative: string, sceneId: number){
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
    newNarrative = JSON.stringify(newNarrative);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`,
      'Content-Type': 'application/json'

      
    });

    return this.http.put<string>(`${this.testUrl}/narrative/${sceneId}`, newNarrative, {headers})
    .pipe(
      catchError(this.handleError)
    );
  }
}