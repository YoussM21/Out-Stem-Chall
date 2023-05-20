import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckOfCardsService {
  private apiUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {}

  shuffleNewDeck(): Observable<any> {
    const url = `${this.apiUrl}/new/shuffle/`;
    return this.http.get(url);
  }
}




