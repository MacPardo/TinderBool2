import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetEquipePage } from './det-equipe.page';

describe('DetEquipePage', () => {
  let component: DetEquipePage;
  let fixture: ComponentFixture<DetEquipePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetEquipePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetEquipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
