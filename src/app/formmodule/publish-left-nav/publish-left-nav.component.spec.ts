import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishLeftNavComponent } from './publish-left-nav.component';

describe('PublishLeftNavComponent', () => {
  let component: PublishLeftNavComponent;
  let fixture: ComponentFixture<PublishLeftNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishLeftNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishLeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
