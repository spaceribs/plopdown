import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStatusComponent } from './get-status.component';

describe('GetStatusComponent', () => {
  let component: GetStatusComponent;
  let fixture: ComponentFixture<GetStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetStatusComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
