import { Injectable } from '@angular/core';

import { PlayerInfoService } from './player-info.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(
    private playerInfoService: PlayerInfoService
  ) { }

  addMessage(msg){//finito
    var add_new_msg: any[] = [];
    var msgs_length: number;
    if(JSON.parse(localStorage.getItem("msg")) == null){
      msgs_length = 0;
    } else{
      msgs_length = Object.keys( JSON.parse(localStorage.getItem("msg")) ).length;
    }
    for(let i=0; i<=msgs_length-1; i++){
      add_new_msg[i] = JSON.parse(localStorage.getItem("msg"))[i] ;  
    }
    add_new_msg[msgs_length] = msg ; 
    localStorage.setItem("msg", JSON.stringify(add_new_msg));
  }
  receiveMsg(){//finito
    for(let i=0; i<this.getMsgs(); i++){
      if(this.playerInfoService.getPlayer() != undefined &&  localStorage.getItem("msg").length > 0
        && JSON.parse(localStorage.getItem("msg"))[i].dest.toLowerCase() ==  this.playerInfoService.getPlayer()
      ){
        var got_msg = true;           
        
      }
    }
    if( got_msg == true){
      alert("HAI UN MESSAGGIO! " + this.playerInfoService.getPlayer().toUpperCase());
    }
  }
  getMsg(){//finito
    var msg = JSON.parse(localStorage.getItem("msg"));
    for(let i=0; i<=Object.keys( JSON.parse(localStorage.getItem("msg")) ).length-1; i++){             
        msg[i] = JSON.parse(localStorage.getItem("msg"))[i];                 
    }
    return msg;
  }
  getMsgs(){ // return the number of messages received non utile da completare
    if(localStorage.getItem("msg") == null){
      var msg_len = 0;
    }else{
      var msg_len = Object.keys( JSON.parse(localStorage.getItem("msg")) ).length;
    }
    return msg_len;
  }
}
