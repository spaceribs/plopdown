import { MockLoggerModule } from '@plopdown/logger/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImporterComponent } from './file-importer.component';
import { MockIconModule } from '@plopdown/icon/mock';

describe('FileImporterComponent', () => {
  let component: FileImporterComponent;
  let fixture: ComponentFixture<FileImporterComponent>;

  beforeEach(async(() => {
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
