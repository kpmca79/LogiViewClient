import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconselectorComponent } from './iconselector.component';

describe('IconselectorComponent', () => {
  let component: IconselectorComponent;
  let fixture: ComponentFixture<IconselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
