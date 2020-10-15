import { Component, OnInit } from '@angular/core';

import { PlayerInfoService } from '../player-info.service';

@Component({
  selector: 'app-classifica',
  templateUrl: './classifica.component.html',
  styleUrls: ['./classifica.component.css'],
  providers: [
    PlayerInfoService
  ]
})
export class ClassificaComponent implements OnInit {

  constructor(
    private playerInfoService: PlayerInfoService
  ) { 
    
  }

  ngOnInit() {
     this.getAllplayerFromLocalStorage();
     setTimeout(() =>{
      this.set_property_css();
     },50)
     //this.set_property_css();
  }
   
  playerArray=[];
  getAllplayerFromLocalStorage(){
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
    for(let i=0; i<playersFromLocalStorage.length; i++){//filtra i msg agli utenti che non devono comparire nell classifica
      if(playersFromLocalStorage[i].name == "msg"){
        playersFromLocalStorage.splice(i,1)
      }
      if(playersFromLocalStorage[i].name == "stat"){
        playersFromLocalStorage.splice(i,1)
      }
    }
    this.playerArray = playersFromLocalStorage;    
    //console.log(playersFromLocalStorage);

    //this.playerInfoService.sortPlayerPoints(playersFromLocalStorage); //non cancellare
    this.playerArray = playersFromLocalStorage.sort(
      (x, y) =>  parseInt(x.points) - parseInt(y.points) 
  );
  this.playerArray =  this.playerArray.reverse();   
  console.log(this.playerArray);
  }
  
  //animazione per la classifica
  
  set_property_css(){    
    for(var i=0; i<=this.playerArray.length-1; i++){      
     document.getElementsByClassName("classifica_style" + i)[0].setAttribute("style", "opacity: 0%; position: relative; top: 10px; transition-duration: 1s; background-color: indigo; animation: classifica_anim0 500ms 1; animation-delay: " +  i/2 + "s; animation-fill-mode: forwards;");
    }      
  }

}

