import { TestBed } from '@angular/core/testing';

import { RaisedTicketService } from './raised-ticket.service';

describe('RaisedTicketService', () => {
  let service: RaisedTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaisedTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
