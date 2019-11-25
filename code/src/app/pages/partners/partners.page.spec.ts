import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersPage } from './partners.page';

describe('PartnersPage', () => {
  let component: PartnersPage;
  let fixture: ComponentFixture<PartnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
