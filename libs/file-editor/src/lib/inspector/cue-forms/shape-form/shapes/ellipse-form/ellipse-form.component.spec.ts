import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EllipseFormComponent } from './ellipse-form.component';

describe('ShapeFormComponent', () => {
  let component: EllipseFormComponent;
  let fixture: ComponentFixture<EllipseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EllipseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EllipseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
