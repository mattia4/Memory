import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() image = null;
  @Input() idp = -1; //index of cards
  @Input() flipped = false;
  @Output() clicked = new EventEmitter<number>();
  @Input() right = null;
  @Input() show = null;
  @Input() turn = null;

  onClick(){
    this.clicked.emit(this.idp);
    
  }
}
