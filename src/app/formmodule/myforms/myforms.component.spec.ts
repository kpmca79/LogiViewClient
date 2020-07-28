import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyformsListComponent } from './myforms.component';

describe('MyformsListComponent', () => {
  let component: MyformsListComponent;
  let fixture: ComponentFixture<MyformsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyformsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyformsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
