import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FileImporterComponent } from './file-importer.component';
import { MockIconModule } from '@plopdown/icon/mock';

describe('FileImporterComponent', () => {
  let component: FileImporterComponent;
  let fixture: ComponentFixture<FileImporterComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MockIconModule, MockPlopdownFileModule, MockLoggerModule],
      declarations: [FileImporterComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
