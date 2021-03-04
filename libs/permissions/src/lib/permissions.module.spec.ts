import { TestBed, waitForAsync } from '@angular/core/testing';
import { PermissionsModule } from './permissions.module';

describe('PermissionsModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PermissionsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PermissionsModule).toBeDefined();
  });
});
