import { Injectable } from '@angular/core';

import { players }  from './Players'
import * as Rx from "rxjs";

const player_info = new Rx.BehaviorSubject("");

@Injectable({
  providedIn: 'root'
})
export class PlayerInfoService {

  constructor( 
 
  ) { }

  private player: players[] = [];

    addPlayer(p: any): any {
      player_info.next(p); // aggiunge il player p a player_info
      player_info.subscribe(p);          
    }
    getPlayer(): any {
      return player_info.value;
    }
    removePlayer(){
      player_info.next("anonimo");
       
    }
    getLocalStoragePlayer(){      
        //inizializzo playersFromLocalStorage: array vuoto,
        // keys: Object.keys(localStorage) array di indici di tutti gli elementi in localStorage,
        // i = lunghezza dell'array keys di indici.
        var playersFromLocalStorage = [],
            keys = Object.keys(localStorage),
            i = keys.length;    
        while ( i-- ) {// i==0 esce dal while
          if(localStorage.key(i) == "stat"){
          }else{
            playersFromLocalStorage.push(//push di un oggetto con nome: keys[i] che sarebbe il nome della chiave i-esima e
              // points: localStorage.getItem(keys[i]) che prende il valore i-esimo dal localStorage dall'array  keys[i], in playersFromLocalStorage.
              {
               name: keys[i],
               points: localStorage.getItem(keys[i])
              }
               );
          }
          
        }
        return  playersFromLocalStorage;     
    }
  
    sortPlayerPoints(s: any): any {//ordina un array di oggetti per il punteggio, usare i sort
      var player1_name: any;
      var player2_name: any;
      
      var player1_points: any;
      var player2_points: any;

       for(let i=0; i<=s.length-1; i++){
         for(let j=0; j<=s.length-1; j++){
          
          if(s[j+1] === undefined){
            //
          }else{
            player1_points = parseInt(s[j].points);
            player2_points = parseInt(s[j+1].points);            
            player1_name = s[j].name;
            player2_name = s[j+1].name;
                      
            if(s[j+1].points >= s[j].points){
              s[j].points = player2_points;
              s[j+1].points = player1_points
              
              s[j].name = player2_name;
              s[j+1].name = player1_name;
            }                        
          }
        }
       }
       
       return s;
    }
   
}

