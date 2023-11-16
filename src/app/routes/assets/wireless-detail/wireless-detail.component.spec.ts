import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WirelessDetailComponent } from './wireless-detail.component';

describe('WirelessDetailComponent', () => {
  let component: WirelessDetailComponent;
  let fixture: ComponentFixture<WirelessDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WirelessDetailComponent]
    });
    fixture = TestBed.createComponent(WirelessDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
