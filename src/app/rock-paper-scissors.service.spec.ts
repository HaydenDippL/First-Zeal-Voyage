import { TestBed } from '@angular/core/testing';

import { RockPaperScissorsService } from './rock-paper-scissors.service';

describe('RockPaperScissorsService', () => {
  let service: RockPaperScissorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RockPaperScissorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
