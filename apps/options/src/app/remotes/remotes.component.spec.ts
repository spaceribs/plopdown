import { MockIconModule } from '@plopdown/icon/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockRemotesModule } from '@plopdown/remotes/mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Remote } from '@plopdown/remotes';

import { RemotesComponent } from './remotes.component';

@Component({
  template: ``,
  selector: 'plopdown-remote-editor',
  standalone: false,
})
class MockRemoteEditorComponent {
  @Input() remote: Remote | null = null;
  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() save: EventEmitter<Remote> = new EventEmitter();
}

describe('RemotesComponent', () => {
  let component: RemotesComponent;
  let fixture: ComponentFixture<RemotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockRemotesModule, MockLoggerModule, MockIconModule],
      declarations: [RemotesComponent, MockRemoteEditorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
