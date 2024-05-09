import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item, Potion, Weapon } from './item';

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

  getPotionById(potionId: number): Observable<Potion> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.httpclient.get<Potion>(`${this.testApiUrl}/potion/${potionId}`, {headers});
  }

  createItem(itemData: Item | Weapon | Potion ): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    switch (itemData.type) {
      case 'weapon':
        return this.httpclient.post<Weapon>(`${this.testApiUrl}/weapon/add`, itemData, {headers});
      case 'potion':
        return this.httpclient.post<Potion>(`${this.testApiUrl}/potion/add`, itemData, {headers});
      default:
        return this.httpclient.post<Item>(this.testApiUrl, itemData, {headers});
    }

    
  }

  updateItem(itemData: Item ): Observable<Item> {
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

  createWeapon(weaponData: Weapon): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.post<Weapon>(`${this.testApiUrl}/weapon/add`, weaponData, {headers});
  }

  createPotion(potionData: Potion): Observable<Item> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });

    return this.httpclient.post<Potion>(`${this.testApiUrl}/potion/add`, potionData, {headers});
  }

  updateWeapon(weaponData: Weapon): Observable<Weapon> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.httpclient.put<Weapon>(`${this.testApiUrl}/weapon/update`, weaponData, {headers});
  }
  
  deleteWeapon(weaponData: Weapon): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.httpclient.delete(`${this.testApiUrl}/weapon/delete/${weaponData.id}`, {headers});
  }
  
  updatePotion(potionData: Potion): Observable<Potion> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.httpclient.put<Potion>(`${this.testApiUrl}/potion/update`, potionData, {headers});
  }
  
  deletePotion(potionData: Potion): Observable<any> {
    if (!this.jwtToken) {
      throw new Error('JWT token not found in session storage.');
    } 
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.jwtToken}`
    });
  
    return this.httpclient.delete(`${this.testApiUrl}/potion/delete/${potionData.id}`, {headers});
  }
}