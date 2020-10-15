import { Component, OnInit } from '@angular/core';

import { GameOptionsService } from '../game-options.service';


import { options } from '../gameOptions'

@Component({
  selector: 'app-menu-opzioni',
  templateUrl: './menu-opzioni.component.html',
  styleUrls: ['./menu-opzioni.component.css'],
  providers: [
    GameOptionsService,
    
  ]
})
export class MenuOpzioniComponent implements OnInit {


  private option: options = {tableSize:'', diff:'', changeCard: false, row: 0, column: 0};
      
  public getOption(): options{
    return this.option;
  }

  constructor(
    private gameOptionsService: GameOptionsService,

  ) {
    
   }

  ngOnInit() {
    this.setDifferentCards();
  }

  tableDimension:any = 'IMPOSTA GRANDEZZA TABELLA';
  index:number = 0;

  custom_setted = false;
  public setTable(){

    this.index++;    
   
    if(this.index == 1){
      this.tableDimension = '2 X 2';
      this.rowDimension = 2;
      this.columnDimension = 2;
    }
    if(this.index == 2){
      this.tableDimension = '4 X 4';
      this.rowDimension = 4;
      this.columnDimension = 4;
    }
    if(this.index == 3){
      this.tableDimension = '8 X 8';  
      this.rowDimension = 8;
      this.columnDimension = 8;          
    }
    if(this.index == 4){
      this.tableDimension = 'Custom';
      this.custom_setted = true;      
      this.index = 0;
    }else{
      this.custom_setted = false;      
    }
  }
  setting_row: number;
  rowDimension: number = 4;
  errore_carte_Dispari = false;
  setRow(){
    this.rowDimension++;   
    if( this.rowDimension*this.columnDimension > 900 && this.rowDimension > this.columnDimension){
      this.rowDimension = 2;
      this.columnDimension = 2;
    }
    if( this.rowDimension * this.columnDimension % 2 >= 1){
      this.errore_carte_Dispari = true;
    }else{
      this.errore_carte_Dispari = false;
    }
  }
  resetRow(){
    this.rowDimension = 2;
     if( this.rowDimension * this.columnDimension % 2 >= 1){
      this.errore_carte_Dispari = true;
    }else{
      this.errore_carte_Dispari = false;
    }
  }
  setting_column: number;
  columnDimension: number = 3;

  setColumn(){
    this.columnDimension++; 
    if( this.rowDimension*this.columnDimension > 900 && this.columnDimension > this.rowDimension){
      this.columnDimension = 2;
      this.rowDimension = 2;
    }  
    if( this.rowDimension * this.columnDimension % 2 >= 1){
      this.errore_carte_Dispari = true;
    }else{
      this.errore_carte_Dispari = false;
    }
  }
  resetColumn(){
    this.columnDimension = 2;
     if( this.rowDimension * this.columnDimension % 2 >= 1){
      this.errore_carte_Dispari = true;
    }else{
      this.errore_carte_Dispari = false;
    }
  }
  gameDiff:any = "SELEZIONA LA DIFFICOLTA'";
  indexDiff:number = 0;

  public setDiff(){

    this.indexDiff++;

    if(this.indexDiff == 1){
      this.gameDiff = 'Facile';
    }
    if(this.indexDiff == 2){
      this.gameDiff = 'Media';
    }
    if(this.indexDiff == 3){
      this.gameDiff = 'Difficile';
      this.indexDiff = 0;
    }
  }   

  saves(){       
    if(this.custom_setted == true){
      this.gameDiff = 'Facile'
    }
    var currentOption: options = {
      tableSize: this.tableDimension,
      diff: this.gameDiff,
      changeCard: this.different_card_choice,
      row:  this.rowDimension,
      column:  this.columnDimension,
    }
    this.gameOptionsService.setOption(currentOption);//nel servizio gameOptionService viene invocata la    
    //funzione setOption che salva in un array currentOption che è la diff e la grandezza della tavola date dalle due funzioni        
  }
  different_cards: string;
  c = false;
  different_card_choice = false;

  setDifferentCards(){
    this.c = !this.c;
    switch(this.c){
      case true:        
       this.different_cards = 'No, sempre uguali';  
       this.different_card_choice = false;       
      break;
      case false:
       this.different_cards = 'Sì, sempre diverse';     
       this.different_card_choice = true;   
      break;
    }    
  }

  close(){        
    return '';        
  }
  
  button_anim(p){
    var button = document.getElementsByClassName("button_anim_style");   
    button[p].setAttribute("style", "animation: button_anim 100ms 1;");  
    setTimeout(()=>{
      button[p].setAttribute("style", "");     
    },101);
  }
  button_anim2(p){
    var button2 = document.getElementsByClassName("button_anim_style2");  
    button2[p].setAttribute("style", "animation: button_anim 100ms 1;");
    setTimeout(()=>{ 
      button2[p].setAttribute("style", "");
    },101);
  }
}
