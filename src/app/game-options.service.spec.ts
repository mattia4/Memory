import { TestBed } from '@angular/core/testing';

import { GameOptionsService } from './game-options.service';

describe('GameOptionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameOptionsService = TestBed.get(GameOptionsService);
    expect(service).toBeTruthy();
  });
});
