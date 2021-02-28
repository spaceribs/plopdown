import { PlopdownLogoComponent } from './plopdown-logo/plopdown-logo.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockWindowRefModule } from '@plopdown/window-ref/mock';
import { MockBrowserRefModule } from '@plopdown/browser-ref/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbedMenuComponent } from './embed-menu.component';

describe('EmbedMenuComponent', () => {
  let component: EmbedMenuComponent;
  let fixture: ComponentFixture<EmbedMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MockIconModule,
        MockBrowserRefModule,
        MockWindowRefModule,
        OverlayModule,
        HttpClientTestingModule,
      ],
      declarations: [EmbedMenuComponent, PlopdownLogoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbedMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
