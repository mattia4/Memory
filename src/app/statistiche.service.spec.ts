import { TestBed } from '@angular/core/testing';

import { StatisticheService } from './statistiche.service';

describe('StatisticheService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatisticheService = TestBed.get(StatisticheService);
    expect(service).toBeTruthy();
  });
});
