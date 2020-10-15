import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomNameService {

  constructor() { }

   weights(){
    var weight = Math.floor(Math.random()*96);
    var cons = ["b","c","d","f","g","l","m","n","p","r","s","t","v"];
    var s = [];
    var new_cons = [];
    for(var i=0; i<cons.length; i++){       
      s.push(Math.floor(Math.random()*weight) + 1)
    }  
    for(var j=0; j<cons.length; j++){        
      for(var k=0; k < s[j]; k++){      
       new_cons.push(cons[j]) ;    
      }
    }  
    return new_cons;
  }
   weights_v(){
    var weight = Math.floor(Math.random()*96);
    var voc = ["a","e","i","o","u"];
    var s = [];
    var new_voc = [], double_voc = ["eo","ea","ue","io"];
    for(var i=0; i<voc.length; i++){       
      s.push(Math.floor(Math.random()*weight) + 1)
    }  
    for(var j=0; j<voc.length; j++){        
      for(var k=0; k < s[j]; k++){      
       new_voc.push(voc[j]) ;    
      }
    }  
    for(var z=0; z<double_voc.length; z++){
      new_voc.push(double_voc[z])
    }
    return new_voc;
  }
   genName(){
      var voc = ["a","e","i","o","u"];//"eo","ea","ue","io"
      var cons; //= ["b","c","d","f","g","l","m","n","p","r","s","t","v"];
      var double = 
      [
       "br","ch","cl","cr","fl","fr","lb","lf","lm","lv","ml","nd","nt","pl","rc","rg","rl","rn","rt","rv","sc","rd",
       "cc","ll","mm","nn","ss","tt"           
      ];//h,q
      var name = '' ;
      var rndV;
      var rndC ;
      var rndO =  Math.floor(Math.random()*2);
      var rndLung = Math.floor(Math.random()*4);
      var final_v = Math.floor(Math.random()*2);//finire con vocale
      var refill_v;//riempire le vocali tolte
      var rndDouble_appear;
      var rndDouble;
      var o;
      
      if(rndLung < 2){
        while(rndLung < 2){
          rndLung = Math.floor(Math.random()*4);        
        }
      }    
      cons = this.weights();
      voc = this.weights_v();
      for(var i=0; i<rndLung; i++){        
        if(rndO === 0){
            o = 0;
        }else{
          if(i===0){
            o = 1;
          }       
        }
       rndDouble_appear = Math.floor(Math.random()*4);
       rndDouble = Math.floor(Math.random()*double.length);
       rndV = Math.floor(Math.random()*voc.length);
       rndC = Math.floor(Math.random()*cons.length);
       refill_v = Math.floor(Math.random()*2)
       if(o === 0){
         o++;//voc.      
         name = name + voc[rndV];
         voc.splice(rndV,1)
         rndV = Math.floor(Math.random()*voc.length);
         if(refill_v == 1){
         voc.push(voc[rndV]);
         rndV = Math.floor(Math.random()*voc.length);
        }
       }
       if(o == 1){
         if(rndDouble_appear == 1 && i !== 0 && i !== rndLung-1){
           o--;//cons           
           name = name + double[rndDouble];       
         }else{
           o--;//cons    
           name = name + cons[rndC];       
         }     
       }   
       if(final_v == 1 && i == rndLung-1){
        name = name + voc[rndV];  
       }
       
      }
      return name;
    }

}
