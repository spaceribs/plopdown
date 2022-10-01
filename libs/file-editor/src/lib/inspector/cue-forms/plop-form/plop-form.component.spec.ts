import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlopFormComponent } from './plop-form.component';

describe('PlopFormComponent', () => {
  let component: PlopFormComponent;
  let fixture: ComponentFixture<PlopFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlopFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlopFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
