import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {ProductlistpropertiesComponent } from './productlistproperties.component';

describe('ProductlistpropertiesComponent', () => {
  let component: ProductlistpropertiesComponent;
  let fixture: ComponentFixture<ProductlistpropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductlistpropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductlistpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
