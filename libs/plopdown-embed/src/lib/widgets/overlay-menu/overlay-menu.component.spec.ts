import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayMenuComponent } from './overlay-menu.component';

describe('OverlayMenuComponent', () => {
  let component: OverlayMenuComponent;
  let fixture: ComponentFixture<OverlayMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        MockBrowserRefModule,
        MockWindowRefModule,
        HttpClientTestingModule,
      ],
      declarations: [OverlayMenuComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
