import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveytableComponent } from './surveytable.component';

describe('TextboxComponent', () => {
  let component: SurveytableComponent;
  let fixture: ComponentFixture<SurveytableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveytableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveytableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
