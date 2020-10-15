import { Directive, Input } from '@angular/core';
import {
  NG_VALIDATORS,
  Validator,
  ValidationErrors,
  FormGroup
  } from '@angular/forms';
import { PlayerInfoService } from './player-info.service';

@Directive({
  selector: '[login]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CheckloginDirective,
    multi: true
    }]
   
})
export class CheckloginDirective implements Validator {

  constructor(
    //private playerInfoService: PlayerInfoService
  ) { }
  
  @Input('login') checkLogin = false;
  validate(formGroup: FormGroup): ValidationErrors {
    var playersRegistred = getLocalStoragePlayer();
    for(let i=0; i<playersRegistred.length; i++){
      if( formGroup.value.Name == playersRegistred[i].Name){
        
      }else{
        if(i == playersRegistred.length){
          return null;
        }        
      }
    }

   function getLocalStoragePlayer(){      
        //inizializzo playersFromLocalStorage: array vuoto,
        // keys: Object.keys(localStorage) array di indici di tutti gli elementi in localStorage,
        // i = lunghezza dell'array keys di indici.
     var playersFromLocalStorage = [],
         keys = Object.keys(localStorage),
         i = keys.length;    
     while ( i-- ) {// i==0 esce dal while
       playersFromLocalStorage.push(//push di un oggetto con nome: keys[i] che sarebbe il nome della chiave i-esima e
            // points: localStorage.getItem(keys[i]) che prende il valore i-esimo dal localStorage dall'array  keys[i], in playersFromLocalStorage.
         {
         name: keys[i],
         points: localStorage.getItem(keys[i])
         }
      );
     }
        return  playersFromLocalStorage;     
   }
  
  }
  
  

}
