import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSolarComponent } from './popup-solar.component';

describe('PopupSolarComponent', () => {
  let component: PopupSolarComponent;
  let fixture: ComponentFixture<PopupSolarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupSolarComponent]
    });
    fixture = TestBed.createComponent(PopupSolarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
