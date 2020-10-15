import { Component, OnInit } from '@angular/core';

//Form
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

//Validazione
import { Validators } from '@angular/forms';
import { PlayerInfoService } from '../player-info.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
  
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private playerInfoService: PlayerInfoService

  ) { }

  ngOnInit() {
  }

  closeLogin(){
    return '';
  }

  //form
  loginForm = new FormGroup({
    Name: new FormControl('', Validators.required)
    
  });
  controlLoginForm = this.formBuilder.group({
    Name: ['', Validators.required]    
  })
  onSubmit(){
   console.warn( this.loginForm.value);
  }

  loginPlayer(v: boolean){    
    if(v == true){     
      var login = {name: this.loginForm.value.Name};
      this.playerInfoService.addPlayer(login);    
            
    }else{
      this.playerInfoService.removePlayer();    
    }
  }
  
  checkLogin(): boolean{   
    var validate = false;
    var playersRegistred = this.playerInfoService.getLocalStoragePlayer();
    
    for(let i=0; i<playersRegistred.length; i++){
      if( this.loginForm.value.Name == playersRegistred[i].name.toLowerCase()){     
        validate =  true;   
        break;                 
      }else{
        if(i == playersRegistred.length){
          validate = false;
        }                  
      }
    }            
    this.loginPlayer(validate);  
    return validate;
  }

}
