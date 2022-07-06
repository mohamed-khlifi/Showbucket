import { TestBed } from '@angular/core/testing';

import { TvMazeApiService } from './tv-maze-api.service';

describe('TvMazeApiService', () => {
  let service: TvMazeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvMazeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
