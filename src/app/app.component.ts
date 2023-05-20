import { Component, OnInit} from '@angular/core';
import { DeckOfCardsService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private deckOfCardsService: DeckOfCardsService) {}

  ngOnInit() {
    this.shuffleNewDeck();
  }

  shuffleNewDeck() {
    
    this.deckOfCardsService.shuffleNewDeck().subscribe((data) => {

      console.log(data);
    });
  }
}
