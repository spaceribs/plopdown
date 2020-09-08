import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewInstallComponent } from './new-install.component';

describe('NewInstallComponent', () => {
  let component: NewInstallComponent;
  let fixture: ComponentFixture<NewInstallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewInstallComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewInstallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
