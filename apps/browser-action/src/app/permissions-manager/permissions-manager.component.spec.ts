import { MockPermissionsModule } from '@plopdown/permissions/mock';
import { MockVideoRefsModule } from '@plopdown/video-refs/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionsManagerComponent } from './permissions-manager.component';
import { MockIconModule } from '@plopdown/icon/mock';

describe('PermissionsManagerComponent', () => {
  let component: PermissionsManagerComponent;
  let fixture: ComponentFixture<PermissionsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        MockBrowserRefModule,
        MockWindowRefModule,
        MockLoggerModule,
        MockVideoRefsModule,
        MockPermissionsModule,
      ],
      declarations: [PermissionsManagerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermissionsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
