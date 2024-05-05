import { TestBed } from '@angular/core/testing';

import { NPCService } from './npc.service';

describe('NPCService', () => {
  let service: NPCService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NPCService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
