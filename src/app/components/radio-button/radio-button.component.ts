import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DeckOfCardsService } from '../../api.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input () text : string | undefined;
  @Input () color : string | undefined;
  // @Output() btnClick = new EventEmitter();
  @Input() colorSelection: string | undefined;
  @Input() deck_id : string | undefined;


  // selectedValue = 'red'; // Default value
  drawnCardSuit: string | undefined;
  selectedValue: string | undefined;
  showCongratsMessage: boolean | null = null;

  onClick() {
    // this.btnClick.emit();
    this.drawAcard();
    console.log(this.deck_id);
  }

  constructor(private deckOfCardsService: DeckOfCardsService) {}


  drawAcard() {
    
    this.deckOfCardsService.drawAcard(this.deck_id).subscribe((data) => {
      
    //   console.log(data);
    //   this.drawnCardSuit = data.card[0].suit;
    // });
    console.log(data);

      if (data.cards && data.cards.length > 0) {
        this.drawnCardSuit = data.cards[0].suit;
      } else {
        console.log('No cards found in the response.');
      }
    });
  }

  submitAnswer() {
    const correctAnswer = (this.drawnCardSuit === 'SPADES' || this.drawnCardSuit === 'CLUBS') ? 'black' : 'red';

    if (this.selectedValue === correctAnswer) {  
      this.showCongratsMessage = true;
    } else {
      this.showCongratsMessage = false;
    }
  }
}
