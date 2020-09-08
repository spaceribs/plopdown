import { async, TestBed } from '@angular/core/testing';
import { PermissionsModule } from './permissions.module';

describe('PermissionsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PermissionsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PermissionsModule).toBeDefined();
  });
});
