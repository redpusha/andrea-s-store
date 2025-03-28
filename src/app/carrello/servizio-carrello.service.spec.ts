import { TestBed } from '@angular/core/testing';

import { ServizioCarrelloService } from './servizio-carrello.service';

describe('ServizioCarrelloService', () => {
  let service: ServizioCarrelloService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServizioCarrelloService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
