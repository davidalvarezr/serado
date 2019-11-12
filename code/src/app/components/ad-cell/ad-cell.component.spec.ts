import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCellComponent } from './ad-cell.component';

describe('AdBasicCardComponent', () => {
  let component: AdCellComponent;
  let fixture: ComponentFixture<AdCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdCellComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
