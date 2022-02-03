import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathFormComponent } from './path-form.component';

describe('PathFormComponent', () => {
  let component: PathFormComponent;
  let fixture: ComponentFixture<PathFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PathFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PathFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
