import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockExtStorageModule } from '@plopdown/ext-storage/mock';
import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { MockTracksModule } from '@plopdown/tracks/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstallComponent } from './new-install.component';

describe('NewInstallComponent', () => {
  let component: NewInstallComponent;
  let fixture: ComponentFixture<NewInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockBrowserRefModule,
        MockLoggerModule,
        MockPlopdownFileModule,
        MockTracksModule,
        MockPermissionsModule,
        MockExtStorageModule,
        HttpClientTestingModule,
      ],
      declarations: [NewInstallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
