import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent {

  @Input () text : string | undefined;
  @Input () color : string | undefined;
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
