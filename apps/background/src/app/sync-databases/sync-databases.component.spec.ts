import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockRemotesModule } from '@plopdown/remotes/mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncDatabasesComponent } from './sync-databases.component';

describe('SyncDatabasesComponent', () => {
  let component: SyncDatabasesComponent;
  let fixture: ComponentFixture<SyncDatabasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MockRemotesModule,
        MockVideoRefsModule,
        MockTracksModule,
        MockLoggerModule,
      ],
      declarations: [SyncDatabasesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncDatabasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
