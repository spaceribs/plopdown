import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CueRendererComponent } from './cue-renderer.component';
import { MockLoggerModule } from '@plopdown/logger/mock';

describe('CueRendererComponent', () => {
  let component: CueRendererComponent;
  let fixture: ComponentFixture<CueRendererComponent>;

  beforeEach(async(() => {
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
