import { Component, OnInit } from '@angular/core';
import { PlayerInfoService } from '../player-info.service';
import { StatisticheService } from '../statistiche.service';

@Component({
  selector: 'app-statistiche',
  templateUrl: './statistiche.component.html',
  styleUrls: ['./statistiche.component.css']
})
export class StatisticheComponent implements OnInit {

  constructor(private playerInfoService: PlayerInfoService,private statisticheService: StatisticheService) { }

  n_match:number = 0;
  show_stat: boolean = false;
  ngOnInit() {         
   this.player_name = this.playerInfoService.getPlayer().name;  
   if(localStorage.getItem("stat") == null ){
  
  }else{
   this.getPlayerStat();  
   this.getPlayerGlobalStat()
    if(this.show_stat==true){
      setTimeout(()=>{
        document.getElementsByClassName("numero_partite")[this.n_match].setAttribute("style","transform: scale(1.3); transition-duration:1s; background-color:orange;");
        //this.n_match++  
      },10)  
    }      
   }
  }
  
  stat = {
    giocatore: '',    
    punteggio: 0,
    diff: '',
    dimensione: '',
    tempo_rimasto: '',
    carte_indovinate: [],
    carte_diverse: false,
    disposizione_casuale: false,
    mosse_eseguite: 0,
    mosse_rimaste: 0,
    tabella_disordinata:false,
    grandezza_tabella: '',
    carte_totali: 0,
    }
    global_stat = {
      numero_partite: 0,    
      punteggio_massimo: 0,
      partite_in_facile: 0,
      partite_in_media: 0,
      partite_in_difficile: 0,
      dimensione_2x2: 0,
      dimensione_4x4: 0,
      dimensione_8x8: 0,
      dimensione_custom: 0,        
      mosse_eseguite_totali: 0,  
      numero_giocatori: 0,             
      }
  player_name ;
  carte_scoperte: any ;
  carte: string[];

  getPlayerStat(){    
        
    if(this.player_name == undefined ){
      this.show_stat = false;
    }else{
      this.stat = this.statisticheService.getStat();
      this.carte_scoperte = this.statisticheService.getStat().carte_scoperte;       
      this.show_stat = true;
    }
    console.log(this.stat);
    this.matches();
  }
  statPlayer(){
    return '';
  }
  total_match = [];
  numero_partite = [];
  matches(){
    var stats_length = Object.keys( JSON.parse(localStorage.getItem("stat")) ).length;     
    for(let i=0; i<stats_length; i++){
      if(this.playerInfoService.getPlayer().name == JSON.parse(localStorage.getItem("stat"))[i].giocatore ){
        this.total_match.push([ JSON.parse(localStorage.getItem("stat"))[i]])
        this.numero_partite.push(i);
      }
    }      
  }   
  matchChoised(){       
    document.getElementsByClassName("change_match")[0].setAttribute("style","animation: change_anim 0.1s 1 linear;");
    setTimeout(()=>{
      document.getElementsByClassName("change_match")[0].setAttribute("style","");
    },100)
    if(this.numero_partite.length==1){
      document.getElementsByClassName("change_match")[0].setAttribute("style","pointer-events: none ;");
    }else{ 
      if( this.n_match >=  this.numero_partite.length-1){  
        for(let i=1; i<this.numero_partite.length; i++){
          document.getElementsByClassName("numero_partite")[i].setAttribute("style",""); 
        }            
        this.n_match = 0;      
        document.getElementsByClassName("numero_partite")[this.n_match].setAttribute("style","transform: scale(1.3); transition-duration:1s; background-color:orange;"); 
        this.stat = this.total_match[ this.n_match][0];      
        this.carte_scoperte = this.total_match[this.n_match][0].carte_scoperte
      }else{            
        this.n_match++;    
        document.getElementsByClassName("numero_partite")[this.n_match].setAttribute("style","transform: scale(1.3); transition-duration:1s; background-color:orange;"); 
        this.stat = this.total_match[ this.n_match][0];
        this.carte_scoperte = this.total_match[this.n_match][0].carte_scoperte      
      }
      console.log("sel: " + this.n_match)
    }    
  }
  getPlayerGlobalStat(){
    this.global_stat = this.statisticheService.getAllStat();
    this.globalMatches();
    this.getMaxPoints();
    this.getDiffMatch();
    this.getSizeTable(); 
    console.log(this.global_stat)
  }
  globalMatches(){
    var stat = Object.keys( JSON.parse(localStorage.getItem("stat")) );
    var stats_length = Object.keys( JSON.parse(localStorage.getItem("stat")) ).length;     
    var total_match = 0;  
    total_match = stats_length;      
    this.global_stat.numero_partite = total_match;    
    setTimeout(()=>{
      document.getElementsByClassName("numero_partite")[0].setAttribute("style","margin:0px; width:"+ this.global_stat.numero_partite+"0px;transform: skew(-20deg); transition-duration: 1s;")
    },10)    
  } 
  getMaxPoints(){
    var globalStat = this.statisticheService.getAllStat();
    var global_stats_length = globalStat.length;   
    var max: number = 0;
    for(let i=0; i<global_stats_length; i++){      
      if(max <= globalStat[i].punteggio ){
        max = globalStat[i].punteggio
      }      
    } 
    this.global_stat.punteggio_massimo = max;
    if(max > 1000 ){
      max = 1000;
    }
    setTimeout(()=>{
      document.getElementsByClassName("punteggio_massimo")[0].setAttribute("style","width:" + max + "px;transform: skew(-20deg); transition-duration: 1s;")
    },10)     
  }
  getDiffMatch(){
    var globalStat = this.statisticheService.getAllStat();
    var global_stats_length = globalStat.length;   
    var facile:number = 0, difficile:number = 0, media:number = 0;//conteggio numero di difficoltà
    for(let i=0; i<global_stats_length; i++){      
      if(globalStat[i].diff == "Facile"){
        facile++;
      }  
      if(globalStat[i].diff == "Media"){
        media++;
      } 
      if(globalStat[i].diff == "Difficile"){
        difficile++;
      }     
    } 
    this.global_stat.partite_in_facile = facile;
    this.global_stat.partite_in_media = media;
    this.global_stat.partite_in_difficile = difficile;
    setTimeout(()=>{
      document.getElementsByClassName("partite_facile")[0].setAttribute("style","width:" + facile + "0px;transform: skew(-20deg); transition-duration: 1s;")
      document.getElementsByClassName("partite_media")[0].setAttribute("style","width:" + media + "0px;transform: skew(-20deg); transition-duration: 1s;")
      document.getElementsByClassName("partite_difficile")[0].setAttribute("style","width:" + difficile + "0px;transform: skew(-20deg); transition-duration: 1s;")
    },10)  
  }
  getSizeTable(){
    var globalStat = this.statisticheService.getAllStat();
    var global_stats_length = globalStat.length;   
    var piccola:number = 0, media:number = 0, grande:number = 0, custom:number = 0;;//conteggio numero di difficoltà
    for(let i=0; i<global_stats_length; i++){      
      if(globalStat[i].grandezza_tabella == "2x2"){
        piccola++;
      }  
      if(globalStat[i].grandezza_tabella == "4x4"){
        media++;
      } 
      if(globalStat[i].grandezza_tabella == "8x8"){
        grande++;
      }  
      if(globalStat[i].grandezza_tabella != "8x8" && globalStat[i].grandezza_tabella != "4x4" && globalStat[i].grandezza_tabella != "2x2"){
        custom++;
      }     
    } 
    this.global_stat.dimensione_2x2 = piccola;
    this.global_stat.dimensione_4x4 = media;
    this.global_stat.dimensione_8x8 = grande;
    this.global_stat.dimensione_custom = custom;
    setTimeout(()=>{
      document.getElementsByClassName("dimensione_facile")[0].setAttribute("style","width:" + piccola + "0px;transform: skew(-20deg); transition-duration: 1s;")
      document.getElementsByClassName("dimensione_media")[0].setAttribute("style","width:" + media + "0px;transform: skew(-20deg); transition-duration: 1s;")
      document.getElementsByClassName("dimensione_grande")[0].setAttribute("style","width:" + grande + "0px;transform: skew(-20deg); transition-duration: 1s;")
      document.getElementsByClassName("dimensione_custom")[0].setAttribute("style","width:" + custom + "0px;transform: skew(-20deg); transition-duration: 1s;")
    },10)  
  }
}
