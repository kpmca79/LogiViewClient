import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNoToggle } from './yes-no-toggle.component';

describe('TextboxComponent', () => {
  let component: YesNoToggle;
  let fixture: ComponentFixture<YesNoToggle>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YesNoToggle ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YesNoToggle);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
