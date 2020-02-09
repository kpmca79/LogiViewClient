import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidetoolbarComponent } from './sidetoolbar.component';

describe('SidetoolbarComponent', () => {
  let component: SidetoolbarComponent;
  let fixture: ComponentFixture<SidetoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidetoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidetoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
