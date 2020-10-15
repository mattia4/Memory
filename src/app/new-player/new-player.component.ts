import { Component, OnInit } from '@angular/core';

//Form
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Validazione
import { Validators } from '@angular/forms';

import { players }  from '../Players'
import { PlayerInfoService } from '../player-info.service';

import { RandomNameService } from '../random-name.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.css'],
  providers: [
    RandomNameService
  ]
})
export class NewPlayerComponent implements OnInit {

  private player_info: players = {
    name:'',
    motto: '',
    punteggio: 0
  }

  constructor(
    private formBuilder: FormBuilder,
    private playerInfoService: PlayerInfoService,// istanzio il servizio playerInfo
    private randomName: RandomNameService
  ) { }  
//form
  playerForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Motto: new FormControl(''),
  });
  controlPlayerForm = this.formBuilder.group({
    Name: ['', Validators.required],
    Motto: ['']
  })

  ngOnInit() {
  }
  generateName(){
    this.playerForm.controls["Name"].setValue(this.randomName.genName())    
    console.log((<HTMLInputElement>document.getElementById("user_name")).value )
  }
  closeNewPlayer(){
    return '';
  }

  onSubmit(){
    console.warn(this.playerForm.value);
  }
  //player info
  getPlayer(): players {
    return this.player_info;
  }
  savePlayer(){
       //add player
       var currentPlayer = {//crea il giocatore corrente ovvero quello appena creato da crea
        name: this.playerForm.value.Name,
        motto: this.playerForm.value.Motto,
        punteggio: 0
      }
      this.playerInfoService.addPlayer(currentPlayer); //uso il metodo addPlayer che si trova nel servizio playerInfo per aggiungere il giocatore
      //appena creato schiacciando sul bottone crea
      
      var getLocalStorage: any = localStorage.getItem(currentPlayer.name);
    
      localStorage.setItem(currentPlayer.name, currentPlayer.punteggio.toString() );
      //var updatePlayerPoins = localStorage.setItem(currentPlayer.name, (localStorage.getItem(currentPlayer.punteggio) + 10).toString() );
  }
 

}
