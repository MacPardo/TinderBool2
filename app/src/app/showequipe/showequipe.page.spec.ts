import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowequipePage } from './showequipe.page';

describe('ShowequipePage', () => {
  let component: ShowequipePage;
  let fixture: ComponentFixture<ShowequipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowequipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowequipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
