import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdListPage } from './ad-list.page';

describe('AdListPage', () => {
  let component: AdListPage;
  let fixture: ComponentFixture<AdListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
