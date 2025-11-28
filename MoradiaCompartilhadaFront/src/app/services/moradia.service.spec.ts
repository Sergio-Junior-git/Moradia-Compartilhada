import { TestBed } from '@angular/core/testing';

import { MoradiaService } from './moradia.service';

describe('MoradiaService', () => {
  let service: MoradiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoradiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
