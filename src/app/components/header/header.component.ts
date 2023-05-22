import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title : string= 'Out-Stem-Challenge';
  title2 : string= 'Guess the card to win!';
  @Input() colorSelection: string | undefined;
  @Input() deck_id : string | undefined;

  Submitguess(){
    console.log('guess')
  }
}
