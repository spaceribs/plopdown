import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebShareComponent } from './web-share.component';

describe('WebShareComponent', () => {
  let component: WebShareComponent;
  let fixture: ComponentFixture<WebShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
