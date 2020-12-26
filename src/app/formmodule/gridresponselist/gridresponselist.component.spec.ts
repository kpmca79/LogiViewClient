import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridresponselistComponent } from './gridresponselist.component';

describe('GridresponselistComponent', () => {
  let component: GridresponselistComponent;
  let fixture: ComponentFixture<GridresponselistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridresponselistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridresponselistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
