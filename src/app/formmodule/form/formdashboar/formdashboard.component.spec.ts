import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdashboardComponent } from './formdashboard.component';

describe('FormdashboardComponent', () => {
  let component: FormdashboardComponent;
  let fixture: ComponentFixture<FormdashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
