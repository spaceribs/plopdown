import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolylineFormComponent } from './polyline-form.component';

describe('PolylineFormComponent', () => {
  let component: PolylineFormComponent;
  let fixture: ComponentFixture<PolylineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolylineFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolylineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
