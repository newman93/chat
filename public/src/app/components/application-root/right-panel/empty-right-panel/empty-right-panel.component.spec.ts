import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRightPanelComponent } from './empty-right-panel.component';

describe('EmptyRightPanelComponent', () => {
  let component: EmptyRightPanelComponent;
  let fixture: ComponentFixture<EmptyRightPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyRightPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyRightPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
