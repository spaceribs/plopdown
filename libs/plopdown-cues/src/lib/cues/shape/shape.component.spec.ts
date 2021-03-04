import { MockLoggerModule } from '@plopdown/logger/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShapeComponent } from './shape.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ShapeComponent', () => {
  let component: ShapeComponent;
  let fixture: ComponentFixture<ShapeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MockLoggerModule],
      declarations: [ShapeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
