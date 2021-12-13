import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectInputComponent } from './object-input.component';

describe('ObjectInputComponent', () => {
  let component: ObjectInputComponent;
  let fixture: ComponentFixture<ObjectInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
