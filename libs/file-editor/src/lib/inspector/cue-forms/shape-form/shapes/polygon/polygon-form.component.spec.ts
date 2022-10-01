import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonFormComponent } from './polygon-form.component';

describe('PolygonFormComponent', () => {
  let component: PolygonFormComponent;
  let fixture: ComponentFixture<PolygonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PolygonFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolygonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
