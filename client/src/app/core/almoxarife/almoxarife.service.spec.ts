import { TestBed, inject } from '@angular/core/testing';

import { AlmoxarifeService } from './almoxarife.service';

describe('AlmoxarifeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlmoxarifeService]
    });
  });

  it('should be created', inject([AlmoxarifeService], (service: AlmoxarifeService) => {
    expect(service).toBeTruthy();
  }));
});
