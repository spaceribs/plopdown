import { TestBed, waitForAsync } from '@angular/core/testing';
import { MessagesModule } from './messages.module';

describe('MessagesModule', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MessagesModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MessagesModule).toBeDefined();
  });
});
