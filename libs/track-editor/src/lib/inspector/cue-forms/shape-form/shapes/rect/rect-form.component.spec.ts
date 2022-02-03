import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RectFormComponent } from './rect-form.component';

describe('RectFormComponent', () => {
  let component: RectFormComponent;
  let fixture: ComponentFixture<RectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RectFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
