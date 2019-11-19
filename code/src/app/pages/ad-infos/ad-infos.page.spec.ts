import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdInfosPage } from './ad-infos.page';

describe('AdInfosPage', () => {
  let component: AdInfosPage;
  let fixture: ComponentFixture<AdInfosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdInfosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdInfosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
