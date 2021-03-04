import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CueRendererComponent } from './cue-renderer.component';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('CueRendererComponent', () => {
  let component: CueRendererComponent;
  let fixture: ComponentFixture<CueRendererComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockLoggerModule],
      declarations: [CueRendererComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CueRendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
