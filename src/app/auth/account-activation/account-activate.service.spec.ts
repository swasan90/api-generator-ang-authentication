import { TestBed } from '@angular/core/testing';

import { AccountActivateService } from './account-activate.service';

describe('AccountActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountActivateService = TestBed.get(AccountActivateService);
    expect(service).toBeTruthy();
  });
});
