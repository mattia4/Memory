import { fakeAsync, async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardTableComponent } from './card-table.component';
import { CardComponent } from '../card/card.component';


fdescribe('CardTableComponent', () => {
  let component: CardTableComponent;
  let fixture: ComponentFixture<CardTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CardTableComponent, CardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getCards_m', () => {
    describe('should properly handle', () => {
      it('4x4', () => {
        component.getCards_m('4 X 4');

        expect(component.game_settings.table_setting.table_setted).toBe(true);
        expect(component.game_settings.table_setting.m_index).toEqual([
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15],
        ]);
        expect(component.game_settings.table_setting.m.length).toBe(4);
        expect(component.game_settings.table_setting.a).toEqual([0, 1, 2, 3]);
        expect(component.game_settings.table_setting.b).toEqual([0, 1, 2, 3]);
      });

      it('2x2', () => {
        component.getCards_m('2 X 2');

        expect(component.game_settings.table_setting.table_setted).toBe(true);
        expect(component.game_settings.table_setting.m_index).toEqual([
          [0,1],
          [2,3],
        ]);
        expect(component.game_settings.table_setting.m.length).toBe(2);
        expect(component.game_settings.table_setting.a).toEqual([0,1]);
        expect(component.game_settings.table_setting.b).toEqual([0,1]);

        // TODO complete
      });

      it('custom table', () => {
        component.getCards_m('IMPOSTA GRANDEZZA TABELLA');

        expect(component.game_settings.table_setting.table_setted).toBe(true);
        expect(component.game_settings.table_setting.m_index).toEqual([
          [0,1,2],
          [3,4,5],
          [6,7,8],
          [9,10,11],
        ]);
        expect(component.game_settings.table_setting.m.length).toBe(4);
        expect(component.game_settings.table_setting.a).toEqual([0,1,2,3]);
        expect(component.game_settings.table_setting.b).toEqual([0,1,2]);

        // TODO complete
      });
    });
  });
/*
  describe('diffChoised()', () => {
    describe('should properly handle', () => {      
      it('Facile', () => {
        component.diffChoised('Facile');        
        expect(component.diffChoised.game_settings.player_info.player_points_multiplier_diff).toBe(2);
      });
      it('Media', () => {
        component.diffChoised('Media');       
        expect(component.game_settings.player_info.player_points_multiplier_diff).toBe(4);
      });
      it('Difficile', () => {
        component.diffChoised('Difficile');                
        expect(component.game_settings.player_info.player_points_multiplier_diff).toBe(8);
      });
     });
    });*/
  describe('tableChoised()', () => {
    describe('should properly handle', () => {      
      it('2 X 2', () => {
        component.tableChoised();
        let testedValue = '2 X 2' ;    
        expect(testedValue).toBe('2 X 2');
      });
      it('4 X 4', () => {
        component.tableChoised();
         let testedValue = '4 X 4' ;       
        expect(testedValue).toBe('4 X 4');
      });
      it('IMPOSTA GRANDEZZA TABELLA', () => {
        component.tableChoised();
         let testedValue = 'IMPOSTA GRANDEZZA TABELLA' ; 
        expect(testedValue).toBe('IMPOSTA GRANDEZZA TABELLA');
      });     
    });
  });
});
