import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberspinnerComponent } from './numberspinner.component';

describe('NumberspinnerComponent', () => {
  let component: NumberspinnerComponent;
  let fixture: ComponentFixture<NumberspinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberspinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberspinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
