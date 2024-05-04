import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Character } from './character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {


  constructor(private http: HttpClient) { }

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/character';
  private testApiUrl = 'http://localhost:5082/api/character';

  private jwtToken = sessionStorage.getItem('jwtToken');

  getCharacterByCampaignId(campaignId: number): Observable<any[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.get<Character[]>(`${this.testApiUrl}/${campaignId}`, {headers});

  }

  addCharacter(characterData: Character): Observable<any> {

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.post<Character>(`${this.testApiUrl}`, characterData, {headers});
    
  }

  updateCharacter(character: Character): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.put( this.testApiUrl, character, {headers});
  }

  deleteCharacter(character: Character): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({'Authorization': `Bearer ${this.jwtToken}`});

    return this.http.delete(`${this.testApiUrl}/${character.id}`, {headers});
  }

}
