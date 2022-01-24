import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapeFormComponent } from './shape-form.component';

describe('ShapeFormComponent', () => {
  let component: ShapeFormComponent;
  let fixture: ComponentFixture<ShapeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShapeFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
