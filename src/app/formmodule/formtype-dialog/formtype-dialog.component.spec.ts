import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormtypeDialogComponent } from './formtype-dialog.component';

describe('FormtypeDialogComponent', () => {
  let component: FormtypeDialogComponent;
  let fixture: ComponentFixture<FormtypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormtypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormtypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
