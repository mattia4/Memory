import { Component, OnInit } from '@angular/core';

import { PlayerInfoService } from '../player-info.service';

import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    public playerInfoService: PlayerInfoService,
    private formBuilder: FormBuilder,
    private messagesService: MessagesService
    
  ) { }

  ngOnInit() {    
    this.userToMessage = this.playerInfoService.getLocalStoragePlayer();
    //console.log(JSON.parse(localStorage.getItem("msg")))
    
    this.messagesService.receiveMsg();
    if( this.playerInfoService.getPlayer().name == undefined){
    }else{      
      this.getMsg(); 
    }      
  }

  sendForm = new FormGroup({
    Name: new FormControl('', Validators.required),
    Message: new FormControl('', Validators.required)
    
  });
  controlSendForm = this.formBuilder.group({
    Name: ['', Validators.required],
    Message: ['', Validators.required]    
  })

  userToMessage: string[];

  closeNewMessage(){
    return "";
  }
  sAU: string;
  selectAutoUser(u: any){
    this.sAU = u;
    this.sendForm.controls["Name"].setValue(this.sAU);   
  }

  onSend(){
    var to_name = '';
    var msg_value = '';
    var msg = {};
    var whoSend='';

    whoSend = this.playerInfoService.getPlayer();
    to_name = this.sendForm.value.Name.toLowerCase();
    msg_value = this.sendForm.value.Message;
    console.log("to " + to_name + " " + "msg: " + msg_value);    
    msg = {dest: to_name, descr: msg_value, from: whoSend};
    this.messagesService.addMessage(msg);
    
  }

  msgArray: any = [];
  get_permiss_for_user = this.playerInfoService.getPlayer().name;
  
  getMsg(){    
    
    for(let i=0; i<this.messagesService.getMsgs(); i++){      
      if(JSON.parse(localStorage.getItem("msg"))[i].dest.toLowerCase() ==  this.playerInfoService.getPlayer().name.toLowerCase()){              
        this.msgArray[i] = this.messagesService.getMsg()[i];                                                   
      }else{
        this.msgArray[i] = {dest: '', descr: "" ,from: {name: '' }}
      }
    }   
    var n_emptyu_val:number = 0;
    for(let i=0; i<this.msgArray.length; i++){ 
      if(this.msgArray[i].dest == ""){
        n_emptyu_val++
      }
    }   
    for(let i=0; i<n_emptyu_val; i++){ 
      for(let i=0; i<this.msgArray.length; i++){               
        if(this.msgArray[i].dest == ""){
          this.msgArray.splice(i,1)        
        }
      }
    }        
  }
  anim_user(){
    var user =  <unknown> document.getElementsByClassName("c");
    var label = document.getElementsByTagName("label");    
    for(let i=0; i< label.length; i++){
      if(user[i].checked){
        label[i].setAttribute("style","animation: anim_user 1s 1 linear forwards");
      }else{
        label[i].setAttribute("style","");
      }      
    }
  }
}
