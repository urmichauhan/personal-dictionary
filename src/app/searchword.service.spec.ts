import { TestBed, inject } from '@angular/core/testing';

import { SearchwordService } from './searchword.service';

describe('SearchwordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchwordService]
    });
  });

  it('should be created', inject([SearchwordService], (service: SearchwordService) => {
    expect(service).toBeTruthy();
  }));
});
