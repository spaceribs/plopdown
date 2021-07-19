import { MockIconModule } from '@plopdown/icon/mock';
import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockRemotesModule } from '@plopdown/remotes/mock';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemotesComponent } from './remotes.component';

describe('RemotesComponent', () => {
  let component: RemotesComponent;
  let fixture: ComponentFixture<RemotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockRemotesModule, MockLoggerModule, MockIconModule],
      declarations: [RemotesComponent],
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
