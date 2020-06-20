import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveComponent } from './archive.component';
import { RouterTestingModule } from '@angular/router/testing';
import { POSTS } from '../blog.config';

describe('ArchiveComponent', () => {
  let component: ArchiveComponent;
  let fixture: ComponentFixture<ArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ArchiveComponent],
      providers: [{ provide: POSTS, useValue: [] }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
