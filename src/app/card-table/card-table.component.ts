import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameOptionsService } from '../game-options.service';
import { PlayerInfoService } from '../player-info.service';
import { StatisticheService } from '../statistiche.service';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
  styleUrls: ['./card-table.component.css'],
  providers: [GameOptionsService, PlayerInfoService],
})
export class CardTableComponent implements OnInit {

  constructor(public gameOptionsService: GameOptionsService, public playerInfoService: PlayerInfoService, private router: Router, private statisticheSrvice: StatisticheService) {}

  game_settings: any = { //game settings
    game_running: false, number_moves: 1/0 , timer: null, start_card_anim_time: 0, loading: false, load_collision:false,endGame: false, errori:0, dis_tab: false, new_disp: false,
    table_setting: {
      m: [], m_index: [], a: [], b: [], table_choice: '', //matrice m,indice per matrice m, ngFor ciclo per indici righe, ngFor ciclo per indici colonne
      table_type: [{dim: "8 X 8",row:8,column:8,mul_diff:16,n_card: 64},{dim: "4 X 4",row:4,column:4,mul_diff:8,n_card: 16},
                   {dim:'2 X 2',row:2,column:2,mul_diff:2,n_card: 4},
                   {dim:'IMPOSTA GRANDEZZA TABELLA',row:4,column:3,mul_diff:4,n_card: 12}, 
                   {dim:'Custom',row: this.gameOptionsService.getOption().row ,
                    column: this.gameOptionsService.getOption().column ,
                    mul_diff:  this.gameOptionsService.getOption().row + this.gameOptionsService.getOption().column ,
                    n_card: this.gameOptionsService.getOption().row*this.gameOptionsService.getOption().column } 
                  ], table_disordered: false,
      card_anim: [] , table_setted: false, size: this.gameOptionsService.getOption().tableSize,
    },
    player_info: {
      table_choice: '', player_points_multiplier_diff: 1, player_points_multiplier_tableSize: 1, player_points: 0, 
      change_card: this.gameOptionsService.getOption().changeCard,
      player_name: this.playerInfoService.getPlayer().name, player_motto: this.playerInfoService.getPlayer().motto
    },
    card_info: { card1: null, card2: null, cardIdflipped: [], checkTurnedCards: [], style_card: '', turning: [], cond: [], count: 0,
                 image_font: this.generate_cards(2,this.gameOptionsService.getOption().row*this.gameOptionsService.getOption().column,
                                                 this.gameOptionsService.getOption().changeCard,[],true)
                ,tot_card: 0,card_location: [],pos_ccra: null,pos_ccra2: null,unique_card1: null,unique_card2: null, always_new_cards: this.gameOptionsService.getOption().changeCard,
               },               
    diff:[ ["Facile" ,{mosse: null, tempo: null, molt_punti: 2}], ["Media" ,{mosse: 12, tempo: null, molt_punti: 4 }],
           ["Difficile" ,{mosse: 9, tempo: null, molt_punti: 8}] 
         ], 
  }
  diffChoised(game_diff = this.gameOptionsService.getOption().diff): any {//set up of moves, timer, points mul
    var diff =  this.game_settings.diff;
    for(let i=0; i< diff.length; i++){
      switch (game_diff) {
        case diff[i][0]:
          this.game_settings.player_info.player_points_multiplier_diff = diff[i][1].molt_punti;
          this.game_settings.number_moves = Math.floor(7/8*this.game_settings.card_info.tot_card) //diff[i][1].mosse;      
          this.game_settings.timer = 5*this.game_settings.card_info.tot_card //diff[i][1].tempo; //sec 
          break;        
      }}    
  }
  timer(t){// reverse counting!
    var time = this.game_settings.timer;           
    for(let i=1; i<=t; i++){            
      setTimeout(()=>{
        this.game_settings.timer = this.game_settings.timer - 1;          
      },1000*i)
    }
    setTimeout(()=>{      
        this.onEndGame();      
    },time*1000)   
  }
  tableChoised(tableSize = this.gameOptionsService.getOption().tableSize): string {//return "2 X 2" / "4 X 4" / "8 X 8" / "IMPOSTA GRANDEZZA TABELLA" / "Custom"        
    var value_returned;
    for(let i=0; i<this.game_settings.table_setting.table_type.length; i++){
      if(tableSize == this.game_settings.table_setting.table_type[i].dim){
        this.game_settings.player_info.player_points_multiplier_tableSize = this.game_settings.table_setting.table_type[i].mul_diff;     
        this.game_settings.card_info.tot_card = this.game_settings.table_setting.table_type[i].n_card;             
        value_returned =  this.game_settings.table_setting.table_type[i].dim;        
        break;
      }   
    }   
    return (this.game_settings.player_info.table_choice = value_returned);  
  }
  ngOnInit() {           
    this.tableChoised();     
    this.game_settings.game_running = true;  
    this.diffChoised();  
    this.getCards_m(this.gameOptionsService.getOption().tableSize);   
    setTimeout(()=>{
      this.start_card_anim();      
    },10)       
    if(this.gameOptionsService.getOption().diff == 'Difficile'){
      this.timer(this.game_settings.timer); // start timer;      
    } 
    setTimeout(()=>{        
      this.resizeTable();              
    },11)                 
  }
  /*i == 86 || i == 97  || i == 105 || i == 138 || i == 148 || i == 150 || i == 205 || i == 207 || i == 224 || i == 226 || i == 245 || i == 246 ||
          i == 262 || i == 285 || i == 286 || i == 298 || i == 414 || i == 422 || i == 332 || i == 463 || i == 394 || i == 359 || i == 303 || i == 333 ||
          i == 346 || i == 470 || i == 462 || i == 438 || i == 303 || i == 332 || i == 414 || i == 422 || i == 438 || i == 462 || i == 463 || i == 470 ||
          i == 489 || i == 540 || i == 561 || i == 578 || i == 587 || i == 589 || i == 592 || i == 595 || i == 597 || i == 601 || i == 624 || i == 632 ||
          i == 636 || i == 644 || i == 647 || i == 673 || i == 697 || i == 706 || i == 707 || i == 708 || i == 709 || i == 710 || i == 711 || i == 712 ||
          i == 713 || i == 714 || i == 720 || i == 725 || i == 734 || i == 745 || i == 746 || i == 747 || i == 748 || i == 749 || i == 750 || i == 751 ||
          i == 752 || i == 753 || i == 754 || i == 761 || i == 762 || i == 763 || i == 771 || i == 792 || i == 801 || i == 812 || i == 843 || i == 850 ||
          i == 854 || i == 895 || i == 897 || i == 899 || i == 917 || i == 920 || i == 934 || i == 956 || i == 963 || i == 968 || i == 1007 || i == 1017 || i == 1034 || i == 1030 || i == 759
          */ 
  if_set(x: number){
    var condition: boolean = false,exclude_index = [86,262,346,489,636,713,752,854,97,285,470,540,644,714,753,895,105,286,462,561,647,720,754,897,138,298,578,673,725,761,899,148,303,587,697,734,762,917,150,422,589,706,745,763,920,205,332,414,592,707,746,771,934,207,463,422,595,708,747,792,956,224,394,438,597,709,748,801,963,226,359,462,601,710,749,812,968,245 ,303 ,463 ,624 ,711 ,750 ,843 ,1007,246 ,333 ,470 ,632 ,712 ,751,850,1017 ,1034,1030,759]      
    for(let i=0; i<exclude_index.length; i++){
      if(x==exclude_index[i]){
        condition = true;        
    }} 
    return condition;
  }
  generate_cards(number_couples: number = 2, superior_limit: number = 32, preset_On = false, preset: any[] = [], always_rnd_cards = false){//in input il numero di carte uguali per ogni carta. si occupa di generare image_font    
    var tmp_gen = [], tmp_gen_rnd = [], cards = [];    
    if(preset_On == false){             
      for(let i=10; i<superior_limit+10; i++){ 
        if(this.if_set(i)){} else{               
          tmp_gen.push([i,300,300]); }
      }        
    }else{
      if(always_rnd_cards == true){
        var new_range = Math.floor(Math.random()*(1074-superior_limit) );
        for(let i=10 + new_range; i<superior_limit + new_range +10; i++){           
          if(this.if_set(i)){} else{               
            tmp_gen.push([i,300,300]); }
        }       
      }else{ tmp_gen = preset; }
    }      
      for(var i=0; i<tmp_gen.length; i++){
        if(number_couples > 0){
            for(var j=0; j<number_couples; j++){
              cards.push('https://picsum.photos/id/'+ tmp_gen[i][0]+'/'+tmp_gen[i][1]+'/'+tmp_gen[i][2]);              
            }          
        }else{
          cards.push('https://picsum.photos/id/'+ tmp_gen[i][0]+'/'+tmp_gen[i][1]+'/'+tmp_gen[i][2]);
        }        
    }           
  return cards;
  }  
  matrixs(i, j) {//get elements i,j of m
    return this.game_settings.table_setting.m[i][j];
  }
  getIndex(i, j): any {// given i, j return the index of the corresponding index of m
    return this.game_settings.table_setting.m_index[i][j];
  }
  getIndexOfCard(c: number) {
    // given an index return the element in m of index c
    for (let i = 0; i < this.game_settings.table_setting.a.length; i++) {
      for (let j = 0; j < this.game_settings.table_setting.b.length; j++) {
        if (this.game_settings.table_setting.m_index[i][j] == c) {
          return this.game_settings.table_setting.m[i][j];
        }}}}
  seekBy(card: string, by: string){// by = "row" oppure "column", ritorna un intero.
    var i: any,j: any, resultSeek;    
    for (i = 0; i < this.game_settings.table_setting.a.length; i++) {
      for (j = 0; j < this.game_settings.table_setting.b.length; j++) {
        if (this.game_settings.table_setting.m[i][j] === card) {          
          return resultSeek = (by == 'row'? i: (by == 'column'? j : console.error("Unexpected parameter")) );          
        }}}}
  getCards_m(tableSize: string) {//set m, m_index, a, b  
    for(let i=0; i<this.game_settings.table_setting.table_type.length; i++){
      if(tableSize == this.game_settings.table_setting.table_type[i].dim){
        var set_row = this.game_settings.table_setting.table_type[i].row, set_column = this.game_settings.table_setting.table_type[i].column,
            set_m_index: any = [], set_m: any[] = [], index = 0;
        this.game_settings.table_setting.m_index = set_m_index;
        this.game_settings.table_setting.m = set_m;
        for(let i=0; i<set_row; i++){
          this.game_settings.table_setting.a.push(i);
        }
        for(let i=0; i<set_column; i++){
          this.game_settings.table_setting.b.push(i);
        }           
        break;
      }
    }    
    for (let i = 0; i < set_row; i++) {
      set_m_index.push([]);
      set_m.push([]);
      for (let j = 0; j < set_column; j++) {
        set_m_index[i][j] = index;
        set_m[i][j] = this.game_settings.card_info.image_font[index];
        index++;
      }
    }
    this.game_settings.table_setting.table_setted = true;
    this.game_settings.table_setting.m_index = set_m_index;
    this.game_settings.table_setting.m = set_m;    
  } 
  random_board_m(k=1) {//ritorna una matrice con gli elementi ridistribuiti su indici casuali., k = 0 disabilita animazione
    var rnd: number, vectN: any = [], matN = [], tableSize = this.gameOptionsService.getOption().tableSize; this.game_settings.new_disp = true;
    for(let i=0; i<this.game_settings.table_setting.table_type.length; i++){//il primo i che fa il match con gli elementi di table_type crea il setup su cui viene costruito tutto il gioco, tabella, indici etc..
      if(tableSize == this.game_settings.table_setting.table_type[i].dim){
        var row: any = this.game_settings.table_setting.table_type[i].row, column: any =  this.game_settings.table_setting.table_type[i].column, rndC: any[] = [];
        for(let i=0; i<row*column; i++){//viene generato rndC con valori da 0 a row*column-1 
          rndC.push(i);          
        }
        var rndC_length = rndC.length;
        break;
      }
    }
    for (let i = 0; i <= rndC_length - 1; i++) {//per ogni valore di rndC, se ne prende uno alla volta a caso e lo si mette in vectN, si ottiene un vettore con valori disposti in maniera diversa
      rnd = Math.floor(Math.random() * rndC.length);
      vectN.push(rndC[rnd]);//si mette in vectN, un valore di rndC con indice rnd casuale
      rndC.splice(rnd, 1);//per evitare di cadere nel riutilizzo degli stessi valori presi a caso si elimina quel valore di indice rnd che si carica in vectN
    }
    for (let i = 0; i <= rndC_length - 1; i++) {//costruisce il vettore (che diventerà matrice) matN con indice vectN[i] cioè ogni valore di vectN, che era stato disposto casualmente, diventa l'indice di dove si mettono i link per le immagini.
      matN[vectN[i]] = this.game_settings.card_info.image_font[i];
    }
    var new_m: any[] = [], idx = 0;
    for (let i = 0; i < this.game_settings.table_setting.a.length; i++) {//si costruisce la matrice new_m prendendo i valori da matN.
      new_m.push([]);
      for (let j = 0; j < this.game_settings.table_setting.b.length; j++) {
        new_m[i][j] = matN[idx];
        idx++;
      }
    }
    this.game_settings.table_setting.m = new_m;
    //animation for random table
    var rnd_card_anim = document.getElementsByClassName("start_anim");
    for (let i = 0; i <= rndC_length - 1; i++) {
      rnd_card_anim[vectN[i]].setAttribute("style","animation: card_start_anim 1s 1 linear; animation-delay:" + 100*i + "ms;");     
    }
    setTimeout(() => {
      for (let i = 0; i <= rndC_length - 1; i++) {      
        rnd_card_anim[i].setAttribute("style","");
      }
    }, k*100*(rndC_length+9));
  }  
  disableCards(d: number){
    if(this.game_settings.card_info.card1 != null && this.game_settings.card_info.card2 != null && d == 1){//d = 0 -> disabilita l'interazione con le carte, else abilita previene un bug in cui se si clicca su due carte e se ne clicca una terza velocemente e ripetutamente rimangono aperte le prime due carte cliccate.
      for(let i=0; i<document.getElementsByClassName("retro").length; i++){
        document.getElementsByClassName("retro")[i].setAttribute("style","pointer-events: none;");
      }
    }else{
      for(let i=0; i<document.getElementsByClassName("retro").length; i++){
        document.getElementsByClassName("retro")[i].setAttribute("style","");
      }}
  }  
  cardClicked(idp: any) {       
    this.game_settings.card_info.count += 1;                       
    if (this.game_settings.card_info.card1 === null) {
      this.game_settings.card_info.card1 = idp;
    } else if (this.game_settings.card_info.card2 === null) {
      this.game_settings.card_info.card2 = idp;
    }
    this.disableCards(1);
    var cardImage1 = this.getIndexOfCard(this.game_settings.card_info.card1), cardImage2 = this.getIndexOfCard(this.game_settings.card_info.card2); 
    var updatePlayerPoins: any, card1_presence = false, card2_presence = false;
      //controllo che cardImage1 e 2 non siano in checkTurnedCards, se ci fossero allora sarebbero già scoperte.
      for (let i = 0; i < this.game_settings.card_info.checkTurnedCards.length; i++) {
        if (cardImage1 == this.game_settings.card_info.checkTurnedCards[i].name && this.game_settings.card_info.checkTurnedCards[i].checked == true) {
          this.game_settings.card_info.style_card = 'turned_card_style';
          card1_presence = true;}
        if (cardImage2 == this.game_settings.card_info.checkTurnedCards[i].name && this.game_settings.card_info.checkTurnedCards[i].checked == true) {
          this.game_settings.card_info.style_card = 'turned_card_style';
          card2_presence = true;}
      }
      if (card1_presence == true || card2_presence == true) {
      console.error('sembra che queste carte siano già state girate');
    } else {      
      if(this.game_settings.table_setting.table_disordered==true){       
        for(let i=0; i<this.game_settings.card_info.card_location.length; i++){       
          if(cardImage1 == this.game_settings.card_info.card_location[i][0] && document.getElementsByTagName("td")[idp].style.top == this.game_settings.card_info.card_location[i][1] ){          
            document.getElementsByTagName("td")[idp].setAttribute("style","opacity:1;position:relative; top:"+this.game_settings.card_info.card_location[i][1]+";left:"+this.game_settings.card_info.card_location[i][2]+";transition-duration:0.5s;");
            this.game_settings.card_info.pos_ccra = i;this.game_settings.card_info.unique_card1 = idp;          
            break;       
          }}
        for(let i=0; i<this.game_settings.card_info.card_location.length; i++){              
          if(cardImage2 == this.game_settings.card_info.card_location[i][0] && document.getElementsByTagName("td")[idp].style.top == this.game_settings.card_info.card_location[i][1] ){          
            document.getElementsByTagName("td")[idp].setAttribute("style","opacity:1;position:relative; top:"+this.game_settings.card_info.card_location[i][1]+";left:"+this.game_settings.card_info.card_location[i][2]+";transition-duration:0.5s;");
            this.game_settings.card_info.pos_ccra2 = i;this.game_settings.card_info.unique_card2 = idp;          
            break;
          }} 
      }         
      this.animate("animate");//card animation     
      if (cardImage1 === cardImage2 && this.game_settings.card_info.card1 != this.game_settings.card_info.card2) {
        this.game_settings.card_info.cond[this.game_settings.card_info.card1] = true;
        this.game_settings.card_info.cond[this.game_settings.card_info.card2] = true;       
        updatePlayerPoins = this.update(); // points update   
        this.game_settings.card_info.checkTurnedCards.push({
          name: this.getIndexOfCard(this.game_settings.card_info.card1),
          checked: true,
        });
        this.game_settings.card_info.checkTurnedCards.push({
          name: this.getIndexOfCard(this.game_settings.card_info.card2),
          checked: true,
        });               
          this.game_settings.card_info.cardIdflipped[this.game_settings.card_info.card1] = 'cardVisibilityOn';
          this.game_settings.card_info.cardIdflipped[this.game_settings.card_info.card2] = 'cardVisibilityOn';      
      } else {             
        this.game_settings.errori++;
        setTimeout(()=>{                  
          this.game_settings.card_info.cardIdflipped[this.game_settings.card_info.card1] = '';             
        },600);
        setTimeout(()=>{                            
          this.game_settings.card_info.cardIdflipped[this.game_settings.card_info.card2] = '';    
        },700);
      }
    }      
    var card_clear_rot_anim1, card_clear_rot_anim2;  
      if(this.game_settings.card_info.count > 1){     
        this.game_settings.card_info.count = 0;
        this.animate("animate_turn_back");       
      setTimeout(() => {   
        this.disableCards(0);
        this.animate("");  
        if(this.game_settings.table_setting.table_disordered==true){
        card_clear_rot_anim1 = document.getElementsByTagName("td")[this.game_settings.card_info.unique_card1].setAttribute("style","opacity:1;position:relative; top:"+this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra][1]+";left:"+this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra][2]+";transform:rotate(" + this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra][2].substring(0,this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra][2].length-2) + "deg);transition-duration:0.5s;");  
        card_clear_rot_anim2 = document.getElementsByTagName("td")[this.game_settings.card_info.unique_card2].setAttribute("style","opacity:1;position:relative; top:"+this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra2][1]+";left:"+this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra2][2]+";transform:rotate(" + this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra2][2].substring(0,this.game_settings.card_info.card_location[this.game_settings.card_info.pos_ccra2][2].length-2) + "deg);transition-duration:0.5s;"); 
        }
        this.game_settings.card_info.unique_card1 = undefined; this.game_settings.card_info.unique_card2 = undefined;
        this.game_settings.card_info.card1 = null; this.game_settings.card_info.card2 = null;  
        this.game_settings.number_moves = (this.gameOptionsService.getOption().diff != "Facile" && this.gameOptionsService.getOption().diff != "SELEZIONA LA DIFFICOLTA'" ?  this.game_settings.number_moves - 1 : null);   
        this.onEndGame();
      }, 1220);
    }   
  }
  animate(animation_style: string){//animation_style = "animate" oppure "animate_turn_back"
    var control = [this.game_settings.card_info.card1,this.game_settings.card_info.card2];
    var turning_style = (animation_style == "animate"? true : (animation_style == "animate_turn_back"? false : (animation_style == ""? null : null)));
    var time1 = (animation_style == "animate"? 0 : (animation_style == "animate_turn_back"? 600 : (animation_style == ""? 0 : null))),
        time2 = (animation_style == "animate"? 200 : (animation_style == "animate_turn_back"? 800 : (animation_style == ""? 0 : null)));         
      for(let i=0; i<control.length; i++){     
          setTimeout(() => {
            this.game_settings.table_setting.card_anim[control[i]] = animation_style;
          }, time1);
          setTimeout(() => {     
            this.game_settings.card_info.turning[control[i]] = turning_style;
          }, time2);}
  }
  update(){
    var k = this.game_settings.timer + 1;
    this.game_settings.player_info.player_points = this.game_settings.player_info.player_points + this.game_settings.player_info.player_points_multiplier_tableSize * Math.pow(2, this.game_settings.player_info.player_points_multiplier_diff);    
    localStorage.setItem(this.playerInfoService.getPlayer().name, localStorage.getItem(this.playerInfoService.getPlayer().punteggio) + this.game_settings.player_info.player_points * k);
  }  
  onEndGame() { 
    var stat: any = [];  
    if (this.game_settings.card_info.checkTurnedCards.length == this.game_settings.table_setting.a.length * this.game_settings.table_setting.b.length ||
        this.game_settings.number_moves == 0 || this.game_settings.timer == 0 ) {
        this.game_settings.endGame = true;     
        stat = {giocatore: this.playerInfoService.getPlayer().name, punteggio: this.game_settings.player_info.player_points*(this.game_settings.timer + 1),
                diff: this.gameOptionsService.getOption().diff,                
                grandezza_tabella: this.game_settings.table_setting.a.length + "x" + this.game_settings.table_setting.b.length,
                carte_diverse: this.game_settings.card_info.always_new_cards, tabella_disordinata: this.game_settings.dis_tab, disposizione_casuale: this.game_settings.new_disp,
                mosse_eseguite: Math.floor(7/8*this.game_settings.card_info.tot_card)-this.game_settings.number_moves,
                mosse_rimaste: this.game_settings.number_moves, tempo_rimasto:(this.game_settings.timer != undefined? this.game_settings.timer: "infiniti") + " secondi", errori: Math.abs(this.game_settings.number_moves-this.game_settings.errori),
                carte_scoperte: this.game_settings.card_info.checkTurnedCards,
                carte_totali:  this.game_settings.table_setting.a.length* this.game_settings.table_setting.b.length,
              }  
      this.statisticheSrvice.addStat(stat);                
      setTimeout(() => {
        localStorage.setItem('endingMatch', 'true');     
        location.reload();
        this.router.navigate(['']); // a fine gioco si fa un redirect per chiudere la finestra del memory
        this.game_settings.endGame = false;        
      }, 4000);}
  }
  isFlipped(idp: any) {    
    return idp === this.game_settings.card_info.card1 || idp === this.game_settings.card_info.card2;
  }
  close_game() { return ''; }
  stop_game(){ this.game_settings.game_running = false; }
  start_card_anim(){    
    var td = document.getElementsByTagName("td"), td_length = td.length, n = td_length;
    this.game_settings.start_card_anim_time = (1 + td_length*100);
    for(let i=0; i<td_length; i++){   
      td[i].setAttribute("style", "animation: card_start_anim 1s 1 linear forwards;animation-delay:"+ 100*i + "ms; ");      
    }
    setTimeout(()=>{
      for(let i=0; i<td_length; i++){   
        td[i].setAttribute("style", "opacity: 1;");              
      }             
    },100*(n+9));//per ottenere 2500: ogni carta successiva inizia con un ritardo di 100ms, all'n-1-esima carta si avrà un ritardo di 100*(n-1) ciò significa che l'ultima carta parte esattamente in quell'istante (animaz.), e dato che che l'animazione dura 1s basta sommarlo al ritardo per ottenere il tempo esatto per cancellare le animazioni. con qualche semplice calcolo si ottiene 100*(n+9).          
  } 
  resizeTable(){//si potrebbe ridurre la ridondanza del codice       
    var total_width_td = this.game_settings.table_setting.b.length * 200;//document.querySelector("table").offsetWidth = this.game_settings.table_setting.b.length * 200
    var table_width = total_width_td, window_width = screen.width, table = document.querySelector("table");                
    var ripos = screen.width/2 + ( Math.floor(total_width_td/200 -7) *200), height: number = 50, width: number = 0.5;   
    if(table_width > window_width/2){               
      if(Math.floor(total_width_td/200 -7) >= 12){              
        if(Math.floor(total_width_td/200 -7) >= 23){                  
          height = 6*height;
          width = width/4;
          ripos = 4*ripos
          table.setAttribute("style","margin:0px;width:"+total_width_td+"px; transform:scale("+ width +","+ width +") translate("+ -ripos+"px, -"+ height +"%); transition-duration: 2s; "); 
        }else{
        height = 3*height;
        width = width/2;
        ripos = 2*ripos
        table.setAttribute("style","margin:0px;width:"+total_width_td+"px; transform:scale(0.25,0.25) translate("+ -ripos+"px, -150%); transition-duration: 2s; "); }
      }else{
        table.setAttribute("style","margin:0px;width:"+total_width_td+"px;transform:scale(0.5,0.5) translate("+ -ripos+"px, -50%); transition-duration: 2s; ");        
      }                             
    }  
  }  
  load(time: number = 2, type_load = "d"){ 
    switch(type_load){
      case "d"://load disorder
        setTimeout(()=>{
          document.getElementById("loading").setAttribute("style","  transition-duration: "+time+"s;  animation: loading_anim "+time+"s 1 linear; animation-fill-mode: forwards;");       
        },1);
      break;
      case "c"://load collision        
        setTimeout(()=>{
          document.getElementById("loading_collision").setAttribute("style","  transition-duration: "+time+"s;  animation: loading_anim "+time+"s 1 linear; animation-fill-mode: forwards;");       
        },1);
      break;
    }          
  }    
  disTable(){
    this.game_settings.table_setting.table_disordered = true; this.game_settings.loading = true; this.game_settings.dis_tab = true;
    this.load(2,"d");   
    this.random_board_m(0);
    var x: number = 1, y: number = 1,x_2: number = 1, y_2: number = 1, card: any = document.getElementsByTagName("td"); 
    var coord = [], rnd_unique: any = [ [[0,0],[0,0]] ], double_x = false, double_y = false;     
    for(let i=0; i<card.length; i++){   
      x = Math.floor(Math.random()*screen.width/2); y = Math.floor(Math.random()*screen.height/2); x_2 = x + 100; y_2 = y + 100;    
      rnd_unique.push([ [x, y] , [x_2, y_2] ]);   
      x = rnd_unique[i][0][0];
      y = rnd_unique[i][0][1];      
      coord.push([x,y]);
      card[i].setAttribute("style","transition-duration:2s; opacity:1;transform:translate( "+ x + "px," + y + "px) rotate("+ x +"deg ) ");        
    }          
    var top: number = 0, left: number = 0;
    setTimeout(()=>{
      for(let i=0; i<card.length; i++){      
        top = coord[i][1] + 150;   
        left = coord[i][0];           
        card[i].setAttribute("style","width:200px;height:200px;opacity:1;position:relative; top:"+top/2+"px;left:"+left/2+"px; transform:rotate("+ left/2 +"deg );");                                                       
      } 
      var width_resized_card = card[0].getBoundingClientRect().width; //ottengo il dato larghezza da una qualsiasi carta         
      this.collision(width_resized_card,width_resized_card);        
    },2000)   
  }    
  collision(dim_x,d=100,dim_y=100){      
    var card: any = document.getElementsByTagName("td"),collision_el = [],hypotesis_collision_resolved=false, step=3/2;
    this.game_settings.load_collision = true;
    this.load(0.2,"c");  
    for(let i=0; i<card.length; i++){
      for(let j=0; j<card.length; j++){              
        if(Math.abs(card[i].getBoundingClientRect().x - card[j].getBoundingClientRect().x) <= dim_x &&
           Math.abs(card[i].getBoundingClientRect().y - card[j].getBoundingClientRect().y) <= dim_y && 
           Math.abs(card[i].getBoundingClientRect().x - card[j].getBoundingClientRect().x) != 0
        ){                        
          collision_el.push(card[j]);
          collision_el.push(card[i]);                       
          hypotesis_collision_resolved = true;                
          console.log("Collision found!");                                               
        }else{
          if(i == card.length-1 && j == card.length-1 && collision_el.length == 0){            
            hypotesis_collision_resolved = false;                  
            console.log("No collisions!");
          }}}}
        
    if(hypotesis_collision_resolved){      
      step = step + 3/2;
      console.log("there is a hypothesis pending ")      
      this.collision(dim_x/step,dim_y/step)      
    }
    for(let i=0; i<collision_el.length; i++){                     
      var x = collision_el[i].getBoundingClientRect().x - Math.floor(Math.random()*100);
      var y = collision_el[i].getBoundingClientRect().y + 150 - Math.floor(Math.random()*100);
      collision_el[i].setAttribute("style","opacity:1;position:relative; top:"+y/2+"px;left:"+x/2+"px;transform:rotate("+ x/2 +"deg );transition-duration:1s;")                                 
    }    
    for(let i=0; i<card.length; i++){      
      var currentSrcImage = <HTMLImageElement>document.getElementsByTagName("td")[i].children[0].children[0].children[0] ;      
      this.game_settings.card_info.card_location.push([currentSrcImage.src,card[i].style.top, card[i].style.left]);
    }            
    this.game_settings.loading = false;  
    setTimeout(()=>{
      this.game_settings.load_collision = false;     
    },500)     
  }
  
}//end class

