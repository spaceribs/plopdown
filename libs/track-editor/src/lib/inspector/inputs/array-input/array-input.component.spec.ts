import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayInputComponent } from './array-input.component';

describe('ArrayInputComponent', () => {
  let component: ArrayInputComponent;
  let fixture: ComponentFixture<ArrayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArrayInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
