import { async, TestBed } from '@angular/core/testing';
import { MessagesModule } from './messages.module';

describe('MessagesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MessagesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MessagesModule).toBeDefined();
  });
});
