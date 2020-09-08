import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallContentScriptComponent } from './install-content-script.component';

describe('InstallContentScriptComponent', () => {
  let component: InstallContentScriptComponent;
  let fixture: ComponentFixture<InstallContentScriptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstallContentScriptComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallContentScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
