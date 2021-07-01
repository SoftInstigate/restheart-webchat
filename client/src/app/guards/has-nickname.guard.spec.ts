import { TestBed } from '@angular/core/testing';

import { HasNicknameGuard } from './has-nickname.guard';

describe('HasNicknameGuard', () => {
  let guard: HasNicknameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(HasNicknameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
