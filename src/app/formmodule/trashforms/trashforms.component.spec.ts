import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrashFormsComponent } from './trashforms.component';

describe('TrashFormsComponent', () => {
  let component: TrashFormsComponent;
  let fixture: ComponentFixture<TrashFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrashFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrashFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
