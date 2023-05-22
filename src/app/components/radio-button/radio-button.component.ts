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


  selectedValue = 'value-1'; // Default value

  onClick() {
    // this.btnClick.emit();
    this.drawAcard();
    console.log(this.deck_id);
  }

  constructor(private deckOfCardsService: DeckOfCardsService) {}


  drawAcard() {
    
    this.deckOfCardsService.drawAcard(this.deck_id).subscribe((data) => {

      console.log(data);
    });
  }
}
