import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPropDialogComponent } from './element-prop-dialog.component';

describe('ElementPropDialogComponent', () => {
  let component: ElementPropDialogComponent;
  let fixture: ComponentFixture<ElementPropDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementPropDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementPropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
