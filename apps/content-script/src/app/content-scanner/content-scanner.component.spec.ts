import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentScannerComponent } from './content-scanner.component';

describe('ContentScannerComponent', () => {
  let component: ContentScannerComponent;
  let fixture: ComponentFixture<ContentScannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContentScannerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
