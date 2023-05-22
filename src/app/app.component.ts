import { Component, OnInit} from '@angular/core';
import { DeckOfCardsService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  deck_id = undefined;
  drawnCardSuit: string | undefined;
  selectedValue: string | undefined;


  constructor(private deckOfCardsService: DeckOfCardsService) {}

  ngOnInit() {
    this.shuffleNewDeck();
  }

  shuffleNewDeck() {
    
    this.deckOfCardsService.shuffleNewDeck().subscribe((data) => {
      this.deck_id = data["deck_id"];

      // this.drawnCardSuit = data.card[0].suit;
      console.log(this.deck_id);
     });
    
  }
}
