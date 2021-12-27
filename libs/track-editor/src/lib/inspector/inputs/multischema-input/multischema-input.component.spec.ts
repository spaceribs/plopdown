import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultischemaInputComponent } from './multischema-input.component';

describe('MultischemaInputComponent', () => {
  let component: MultischemaInputComponent;
  let fixture: ComponentFixture<MultischemaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultischemaInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultischemaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
