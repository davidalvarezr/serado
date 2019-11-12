import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdListComponent } from './ad-list.component';

describe('AdBasicListComponent', () => {
  let component: AdListComponent;
  let fixture: ComponentFixture<AdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
