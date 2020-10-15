import { Injectable } from '@angular/core';

import { options } from './gameOptions'

import * as Rx from "rxjs";
/*ESEMPIO D'USO
const subject = new Rx.BehaviorSubject(Math.random());//si può anche inizializzare senza valore tra parentesi, ed avremo undefined

// subscriber 1
subject.subscribe((data) => {
  console.log('Subscriber A:', data);
});

subject.next(Math.random());
subject.next(Math.random());

// subscriber 2
subject.subscribe((data) => {
  console.log('Subscriber B:', data);
});

subject.next(Math.random());

console.log(subject.value)

//FUNZIONAMENTO DI SUBJECT, VIENE INIZIALMENTE CREATO UN NUOVO OGGETTO rX.BehaviorSubject() salvato nella costante subject.
//.next(valore) viene salvato in subject "valore" per due volte, con subscribe()(data)=>{data}) viene mostrato con console.log l'ultimo valore
//immesso da .next() e come viene anche dimostrato da subscriber 2, per accede al valore in subject si può anche usare .value. es subject.value.
*/

const table_size = new Rx.BehaviorSubject("");//tiene i dati salvati finchè la pagina non viene ricaricata!
//il nome table_size è fuorviante ma contiene sia la difficoltà che la grandezza della tabella!

@Injectable({
  providedIn: 'root'
})
export class GameOptionsService {

  constructor() { }

  private option: options[] = [];

  setOption(op: any){
    table_size.next(op);  
    table_size.subscribe((op) => {
      console.log('Dati salvati:', op);
    });    
    
  }
  getOption(): any{
    //return table_size.value.tableSize
    return table_size.value
  }
}
