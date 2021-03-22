import { TestBed } from '@angular/core/testing';

import { SyncMediaService } from './sync-media.service';

describe('SyncMediaService', () => {
  let service: SyncMediaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SyncMediaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getTimeDifference()', () => {
    it('should return the difference', (done) => {
      const parent = document.createElement('video');
      const child = document.createElement('video');

      parent.currentTime = 10;
      child.currentTime = 20;
      const offset = 0;

      service.getTimeDifference(parent, child, offset).subscribe(
        (diff) => {
          expect(diff).toBe(-10);
          done();
        },
        (err) => {
          throw err;
        }
      );
    });

    it('should return the difference with an offset', (done) => {
      const parent = document.createElement('video');
      const child = document.createElement('video');

      parent.currentTime = 10;
      child.currentTime = 20;
      const offset = 10;

      service.getTimeDifference(parent, child, offset).subscribe(
        (diff) => {
          expect(diff).toBe(-20);
          done();
        },
        (err) => {
          throw err;
        }
      );
    });

    it('should support different media types', (done) => {
      const parent = document.createElement('audio');
      const child = document.createElement('video');

      parent.currentTime = 10;
      child.currentTime = 20;
      const offset = 10;

      service.getTimeDifference(parent, child, offset).subscribe(
        (diff) => {
          expect(diff).toBe(-20);
          done();
        },
        (err) => {
          throw err;
        }
      );
    });
  });
});
