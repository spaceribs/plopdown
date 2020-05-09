import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileImporterComponent } from './file-importer.component';

describe('FileImporterComponent', () => {
  let component: FileImporterComponent;
  let fixture: ComponentFixture<FileImporterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileImporterComponent ]
    })
    .compileComponents();
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
