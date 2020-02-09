import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveformComponent } from './liveform.component';

describe('LiveformComponent', () => {
  let component: LiveformComponent;
  let fixture: ComponentFixture<LiveformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
