import { MockRemotesModule } from '@plopdown/remotes/mock';
import { MockIconModule } from '@plopdown/icon/mock';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemoteEditorComponent } from './remote-editor.component';

describe('RemoteEditorComponent', () => {
  let component: RemoteEditorComponent;
  let fixture: ComponentFixture<RemoteEditorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          FormsModule,
          ReactiveFormsModule,
          MockIconModule,
          MockRemotesModule,
        ],
        declarations: [RemoteEditorComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoteEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
