import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RattingComponent } from './ratting.component';

describe('TextboxComponent', () => {
  let component: RattingComponent;
  let fixture: ComponentFixture<RattingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RattingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RattingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
