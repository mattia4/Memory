import { Component, OnInit,  } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerInfoService } from '../player-info.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit  {

  constructor(
    private playerInfoService: PlayerInfoService,  private router: Router
  ) { }
  
 
  
  ngOnInit() {    
    /*
    for(let i=0; i<=document.getElementsByClassName("list_item").length; i++){
      setTimeout(()=>{
        this.menu_selection(i)        
      },500*i)      
    }    
    setTimeout(()=>{
      this.menu_selection(0) 
    },2010)  
  */
      if(localStorage.getItem("endingMatch") == "true" ){
        //anim
        this.start_anim()
        localStorage.removeItem("endingMatch");
      }else{
        //no anim
          setTimeout(()=>{
            this.menu_selection(0); 
            this.menu_selection(1);       
            this.menu_selection(2);          
            this.menu_selection(3); 
            this.menu_selection(4); 
            this.menu_selection(5);
            this.menu_selection(6);
            this.menu_selection(0); 
        },1) 
      }
  }
  //start animation
  start_anim(){
    var anim_for_player: number = this.playerInfoService.getLocalStoragePlayer().length;
    setTimeout(()=>{
      this.menu_selection(0); 
      this.menu_selection(1);       
      this.menu_selection(2);          
      this.menu_selection(3); 
      this.menu_selection(4);
      this.menu_selection(5);
      this.menu_selection(6); 
      this.menu_selection(0); 
    },0)

    setTimeout(()=>{
      this.menu_selection(0); 
    },1) 
    setTimeout(()=>{
      this.menu_selection(1); 
    },200) 
    setTimeout(()=>{
      this.menu_selection(2); 
    },400) 
    setTimeout(()=>{
      this.menu_selection(3); 
    },anim_for_player*500) //3201
    setTimeout(()=>{
      this.menu_selection(4); 
    },anim_for_player*500 + 600) //3801
    setTimeout(()=>{
      this.menu_selection(5); 
    },anim_for_player*500 + 2*600) //4401
    setTimeout(()=>{
      this.menu_selection(6); 
    },anim_for_player*500 + 3*600) //4401
    setTimeout(()=>{
      this.menu_selection(0); 
    },anim_for_player*500 + 4*600) //5001
  }
  //play game
  game_active='';
  set_game_on = false;
  nascondiClassifica = '';
  
  show_game(){
    this.set_game_on = !this.set_game_on;
   
    if(this.set_game_on){
      this.game_active='/card-table';
      //this.nascondiClassifica = 'hide';
      //if(this.nascondiClassifica == 'hide'){
        //this.nascondiClassifica = '';
      //}
      //if(this.nascondiClassifica == ''){
        //this.nascondiClassifica = 'hide';
      //}

    }else{
      this.game_active='';      
      this.nascondiClassifica = '';
    }    
  }
  move_right: number = 0;
  move_prec: number;
  moveRight(){
    this.router.navigate(['']);
    this.move_right++;
    this.menu_selection(this.move_right);        
  }

  succ: any;
  prec: any;

  menu_selection(R: number){
    this.router.navigate(['']);
    var menuList = document.getElementsByClassName("list_item");
    var menuListLen = menuList.length;
    
      if(menuList[R+1] != undefined  ){        
        this.succ = menuList[R+1];
      }else{
        this.succ = menuList[0];
      }
      if(menuList[R-1] != undefined  ){        
        this.prec = menuList[R-1];
      }else{
        this.prec = menuList[menuListLen-1];
      }
     
    this.succ =  this.succ.innerText.substring(0,11); //da togliere substring appena si rompe
    this.prec =  this.prec.innerText.substring(0,11);

    console.log(R +" "+menuListLen);
    //move right;
    if(R > 0){
      document.getElementsByClassName("list_item")[R-1].setAttribute("class","list_item focusOff");      
    }
    if(R <= -1){
      this.move_right = 4;
      R = 4
      document.getElementsByClassName("list_item")[menuListLen-1].setAttribute("class","list_item focusOff");      
    }
    if(R == 0){             
      document.getElementsByClassName("list_item")[menuListLen-1].setAttribute("class","list_item focusOff") 
    }
    document.getElementsByClassName("list_item")[menuListLen-1].setAttribute("class","list_item focusOff");
   
    if(R >= menuListLen){    
      this.move_right = 0;  
      this.menu_selection(0)
    }else{
      document.getElementsByClassName("list_item")[R].setAttribute("class","list_item focusOn");
    }  
  }
    menu_selection_back(){//da sistemare
      var menuList = document.getElementsByClassName("list_item");

      if(this.move_right == 0){
        this.move_prec = 0;
        this.prec = menuList[0];
        this.prec = "END";   
      }
      if(this.move_right > 0){    
        
        this.move_prec = this.move_right-1; 
        if(this.move_prec-1 <= -1){
          this.prec = menuList[ 0 ]; 
          this.prec = this.prec.innerText.substring(0,11);
        }else{
          this.prec = menuList[ this.move_prec-1 ]; 
          this.prec = this.prec.innerText.substring(0,11);
        }
                    
        menuList[this.move_prec].setAttribute("class","list_item focusOn");
        menuList[this.move_right].setAttribute("class","list_item focusOff");     
        this.succ = menuList[this.move_prec+1];   
        this.succ = this.succ.innerText.substring(0,11);               
        this.move_right = this.move_prec;
      
      }
    }
    button_anim(p){
      var button = document.getElementsByClassName("item");     
      button[p].setAttribute("style", "animation: button_anim 100ms 1;");          
      setTimeout(()=>{
        button[p].setAttribute("style", "");
      },101);
    }
  
    
}
