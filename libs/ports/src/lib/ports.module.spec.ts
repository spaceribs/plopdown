import { async, TestBed } from '@angular/core/testing';
import { PortsModule } from './ports.module';

describe('PortsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PortsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PortsModule).toBeDefined();
  });
});
