import { TabsService } from './tabs.service';
import { TestBed } from '@angular/core/testing';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';

describe('TabsService', () => {
  let service: TabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MockBrowserRefModule],
    });
    service = TestBed.inject(TabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
