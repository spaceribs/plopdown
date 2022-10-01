import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevtoolContentScriptComponent } from './devtool-content-script.component';

describe('DevtoolContentScriptComponent', () => {
  let component: DevtoolContentScriptComponent;
  let fixture: ComponentFixture<DevtoolContentScriptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevtoolContentScriptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DevtoolContentScriptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
