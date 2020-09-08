import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksRequestedComponent } from './tracks-requested.component';

describe('TracksRequestedComponent', () => {
  let component: TracksRequestedComponent;
  let fixture: ComponentFixture<TracksRequestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TracksRequestedComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksRequestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
