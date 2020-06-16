import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { TestBed } from '@angular/core/testing';

import { LoadAssetService } from './load-asset.service';
import { MockPlopdownEmbedModule } from '@plopdown/plopdown-embed/mock';

describe('LoadAssetService', () => {
  let service: LoadAssetService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MockPlopdownEmbedModule,
        MockWindowRefModule,
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(LoadAssetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
