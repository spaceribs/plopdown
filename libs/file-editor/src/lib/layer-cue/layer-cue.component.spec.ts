import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerCueComponent } from './layer-cue.component';

describe('LayerCueComponent', () => {
  let component: LayerCueComponent;
  let fixture: ComponentFixture<LayerCueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LayerCueComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LayerCueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
