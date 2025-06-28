import { TestBed } from '@angular/core/testing';

import { UserPreferencesStore } from './user-preferences';

describe('UserPreferencesStore', () => {
  let service: UserPreferencesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferencesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
