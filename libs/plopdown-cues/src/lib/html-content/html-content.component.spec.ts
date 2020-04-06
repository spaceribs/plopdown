import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlContentComponent } from './html-content.component';

describe('HtmlContentComponent', () => {
  let component: HtmlContentComponent;
  let fixture: ComponentFixture<HtmlContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
