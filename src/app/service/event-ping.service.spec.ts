import { TestBed } from '@angular/core/testing';

import { EventPingService } from './event-ping.service';

describe('EventPingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EventPingService = TestBed.get(EventPingService);
    expect(service).toBeTruthy();
  });
});
