import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CardTableComponent } from './card-table/card-table.component';
import { CardComponent } from './card/card.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { MenuOpzioniComponent } from './menu-opzioni/menu-opzioni.component';
import { GameOptionsService } from './game-options.service';
import { PlayerInfoService } from './player-info.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { ClassificaComponent } from './classifica/classifica.component';
import { GameOverComponent } from './game-over/game-over.component';
import { RandomNameService } from './random-name.service';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { CheckloginDirective } from './checklogin.directive';
import { StatisticheComponent } from './statistiche/statistiche.component';



@NgModule({
  declarations: [
    AppComponent,
    CardTableComponent,
    CardComponent,
    MenuComponent,
    MenuOpzioniComponent,
    PageNotFoundComponent,
    NewPlayerComponent,
    ClassificaComponent,
    GameOverComponent,
    LoginComponent,
    MessageComponent,
    CheckloginDirective,
    StatisticheComponent
  ],
  exports:[
    CardComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([

    
      { 
        path: 'menu-opzioni',
        component: MenuOpzioniComponent,
        outlet: "opzioni"
        },
      { 
        path: 'new-player',
        component: NewPlayerComponent,
        outlet: "player"
      }, 
      { 
        path: 'classifica',
        component: ClassificaComponent,
        outlet: "tabella"
      },
      { 
        path: '',
        redirectTo: '/(tabella:classifica)',
        pathMatch: 'full'
      },   
      {
        path: 'card-table',
        component: CardTableComponent,
        outlet: "game"
      },
      {
        path: 'login',
        component: LoginComponent,
        outlet: "login"
      },
      {
        path: 'message',
        component: MessageComponent,
        outlet: "message"
      },
      {
        path: 'game-over',
        component: GameOverComponent,
        outlet: 'over'
      },
      {
        path: 'statistiche',
        component: StatisticheComponent,
        outlet: 'statistiche'
      }
    

    ]),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    GameOptionsService,
    PlayerInfoService,
    RandomNameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
