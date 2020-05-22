import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNavComponent } from './site-nav.component';

describe('SiteNavComponent', () => {
  let component: SiteNavComponent;
  let fixture: ComponentFixture<SiteNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
