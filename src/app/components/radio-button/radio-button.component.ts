import { Component, Input, Output } from '@angular/core';
import { DeckOfCardsService } from '../../api.service';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input () text : string | undefined;
  @Input () color : string | undefined;
  @Input() colorSelection: string | undefined;
  @Input() deck_id : string | undefined;
  @Input() shuffleNewDeck!: () => void;

  drawnCardSuit: string | undefined;
  selectedValue: string | undefined;
  showCongratsMessage: boolean | null = null;
  showRestartButton: boolean = false;
  showNextStageButton: boolean = false;
  userPrediction : string | null = null;
  firstCardValue: string | null = null;
  newCardValue: string | null = null;
  guess: string | null = null;
  showNextStage: boolean = false;
  newCardSuit: string | null = null;
  cardSuit : string | null = null;
  showNextStage2: boolean = false;

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
        this.firstCardValue = data.cards[0].value;
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
      this.showNextStageButton = true;
      this.showRestartButton = true;
    } else {
      this.showCongratsMessage = false;
      this.showRestartButton = true;
    }
  }

  restartGame() {
    this.showCongratsMessage = null;
    this.showRestartButton = false;
    this.showNextStageButton = false;
    this.shuffleNewDeck();
  }

  compareCards() {
    const SpecialCards : { [key: string]: number }= {
      JACK : 11,
      QUEEN : 12,
      KING : 13,
      ACE : 14
    }

    // if (this.firstCardValue && this.newCardValue) {
    //   const isFirstCardSpecial = this.firstCardValue in SpecialCards;
    //   const isNewCardSpecial = this.newCardValue in SpecialCards;
  
    //   if (isFirstCardSpecial && isNewCardSpecial) {
    //     const isFirstCardHigher = SpecialCards[this.firstCardValue] > SpecialCards[this.newCardValue];
    //     const isSameValue = SpecialCards[this.firstCardValue] === SpecialCards[this.newCardValue];
  
    //     if (
    //       (this.guess === 'higher' && isFirstCardHigher) ||
    //       (this.guess === 'lower' && !isFirstCardHigher) ||
    //       (this.guess === 'equal' && !isSameValue)
    //     ) {
    //       this.showCongratsMessage = true;
    //       // this.showNextStageButton = true;
    //       // this.showRestartButton = true;
    //     } else {
    //       this.showCongratsMessage = false;
    //       // this.showRestartButton = true;
    //     }
    //     this.showNextStage = true;
    if (this.firstCardValue && this.newCardValue) {
      const isFirstCardHigher = this.firstCardValue > this.newCardValue;
      const isSameValue = this.firstCardValue === this.newCardValue;

    //   if (
    //     (this.guess === 'higher' && isFirstCardHigher) ||
    //     (this.guess === 'lower' && !isFirstCardHigher) ||
    //     (this.guess === 'equal' && !isSameValue)
    //   ) {
    //     this.showCongratsMessage = false;
    //     // this.showNextStageButton = true;
    //     // this.showRestartButton = true;
    //   } else {
    //     this.showCongratsMessage = true;
    //     // this.showRestartButton = true;
    //   }
    //   // this.showNextStage = true;
    // // }
    if(this.guess === 'higher' && isFirstCardHigher){
      this.showCongratsMessage = false;
    } else {
        if(this.guess === 'higher' && !isFirstCardHigher){
          this.showCongratsMessage = true;
        } else {
            if(this.guess === 'higher' && isSameValue){
              this.showCongratsMessage = false;
            } else {
                if(this.guess === 'lower' &&  isFirstCardHigher){
                  this.showCongratsMessage = true;
                } else {
                    if (this.guess === 'lower' && !isFirstCardHigher){
                      this.showCongratsMessage = false;
                    } else{
                        if(this.guess === 'lower' &&  isSameValue){
                          this.showCongratsMessage = false;
                        } else {
                            if (this.guess === 'equal' &&  isFirstCardHigher){
                              this.showCongratsMessage = false;
                            } else {
                                if(this.guess === 'equal' && !isFirstCardHigher){
                                  this.showCongratsMessage = false;
                            }  else {
                                if (this.guess === 'equal' &&  isSameValue){
                                  this.showCongratsMessage = true;
                              } 
                            }
                        }
                    }
                }
            }
        }
      }
    }
  }
}
  
  moveToNextStage() {
    this.newCardValue = null;
    this.guess = null;
    this.showCongratsMessage = null;
    this.showNextStage = !this.showNextStage;
    this.drawAcard2();
  }

  drawAcard2() {
    
    this.deckOfCardsService.drawAcard(this.deck_id).subscribe((data) => {
      
    //   console.log(data);
    //   this.drawnCardSuit = data.card[0].suit;
    // });
    console.log(data);

      if (data.cards && data.cards.length > 0) {
        this.newCardValue = data.cards[0].value;
        // this.drawnCardSuit = data.cards[0].suit;
      } else {
        console.log('No cards found in the response.');
      }
    });
  }

  moveToNextStage2() {
    this.showNextStage = true;
    this.showNextStage2 = true;
    this.drawAcard3();
  }

  drawAcard3() {
    
    this.deckOfCardsService.drawAcard(this.deck_id).subscribe((data) => {

    console.log(data);

      if (data.cards && data.cards.length > 0) {
        this.newCardSuit = data.cards[0].suit;
        // this.drawnCardSuit = data.cards[0].suit;
      } else {
        console.log('No cards found in the response.');
      }
    });
  }
}