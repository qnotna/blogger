import { TestBed } from '@angular/core/testing';

import { ParticleSystemService } from './particle-system.service';

describe('ParticleSystemService', () => {
  let service: ParticleSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticleSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
