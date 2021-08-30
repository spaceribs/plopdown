import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockDevtoolsRefModule } from '@plopdown/devtools-ref/mock';

import { PanelManagerComponent } from './panel-manager.component';

describe('PanelManagerComponent', () => {
  let component: PanelManagerComponent;
  let fixture: ComponentFixture<PanelManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, MockDevtoolsRefModule],
      declarations: [PanelManagerComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });
});
