import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlopdownLogoComponent } from './plopdown-logo.component';

describe('PlopdownLogoComponent', () => {
  let component: PlopdownLogoComponent;
  let fixture: ComponentFixture<PlopdownLogoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlopdownLogoComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlopdownLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
