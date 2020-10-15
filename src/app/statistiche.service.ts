import { Injectable } from '@angular/core';
import { PlayerInfoService } from './player-info.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticheService {

  constructor(private playerInfoService: PlayerInfoService) { }

  addStat(stat){
    var add_new_stat: any[] = [];
    var stats_length: number;
    if(JSON.parse(localStorage.getItem("stat")) == null){
      stats_length = 0;
    } else{
      stats_length = Object.keys( JSON.parse(localStorage.getItem("stat")) ).length;
    }
    for(let i=0; i<=stats_length-1; i++){
      add_new_stat[i] = JSON.parse(localStorage.getItem("stat"))[i] ;  
    }
    add_new_stat[stats_length] = stat ; 
    localStorage.setItem("stat", JSON.stringify(add_new_stat));
  }
  getStat(): any{
    var stat: any;    
    for(let i=0; i<Object.keys( JSON.parse(localStorage.getItem("stat")) ).length; i++){
      if(this.playerInfoService.getPlayer().name == JSON.parse(localStorage.getItem("stat"))[i].giocatore ){        
        stat = JSON.parse(localStorage.getItem("stat"))[i]
        return stat;
      }
    }
  }
  getAllStat(): any{    
    var allStat: any[];    
    allStat = JSON.parse(localStorage.getItem("stat"));    
    return allStat; 
  }
  

}
