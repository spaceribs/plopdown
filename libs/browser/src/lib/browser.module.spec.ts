import { async, TestBed } from '@angular/core/testing';
import { BrowserModule } from './browser.module';

describe('BrowserModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BrowserModule).toBeDefined();
  });
});
