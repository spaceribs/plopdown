import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PlopComponent } from './plop.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PlopComponent', () => {
  let component: PlopComponent;
  let fixture: ComponentFixture<PlopComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [PlopComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
