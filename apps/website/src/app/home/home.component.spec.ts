import { PlyrService } from './plyr.service';
import { MockPlopdownEmbedModule } from '@plopdown/plopdown-embed/mock';
import { MockPlopdownFileModule } from '@plopdown/plopdown-file/mock';
import { SiteFooterComponent } from './../site-footer/site-footer.component';
import { SiteNavComponent } from './../site-nav/site-nav.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { HomeComponent } from './home.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MockPlopdownFileModule,
        MockPlopdownEmbedModule,
      ],
      declarations: [HomeComponent, SiteNavComponent, SiteFooterComponent],
      providers: [{ provide: PlyrService, useValue: { create: jest.fn() } }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
