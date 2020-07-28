import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignaturepadComponent } from './signaturepad.component';

describe('TextboxComponent', () => {
  let component: SignaturepadComponent;
  let fixture: ComponentFixture<SignaturepadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignaturepadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignaturepadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
