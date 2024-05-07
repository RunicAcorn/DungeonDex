import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private httpclient: HttpClient) { }

  private apiUrl = 'https://dungeonapi.azurewebsites.net/api/item';
  private testApiUrl = 'http://localhost:5082/api/item';
  private jwtToken = sessionStorage.getItem('jwtToken');

  getItemsByCampaignId(campaignId: number): Observable<Item[]> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.get<Item[]>(`${this.testApiUrl}/${campaignId}/all`, {headers});
  }

  getItemById(itemId: number): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.get<Item>(`${this.testApiUrl}/${itemId}`, {headers});
  }

  createItem(itemData: Item): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.post<Item>(this.testApiUrl, itemData, {headers});
  }

  updateItem(itemData: Item): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.put<Item>(this.testApiUrl, itemData, {headers});
  }

  deleteItem(itemData: Item): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.delete(`${this.testApiUrl}/${itemData.id}`, {headers});
  }

  createWeapon(weaponData: Item): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.post<Item>(`${this.testApiUrl}/weapon/add`, weaponData, {headers});
  }

  createPotion(potionData: Item): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.post<Item>(`${this.testApiUrl}/potion/add`, potionData, {headers});
  }
}