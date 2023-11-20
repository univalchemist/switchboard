import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergymeterDetailsComponent } from './energymeter-details.component';

describe('EnergymeterDetailsComponent', () => {
  let component: EnergymeterDetailsComponent;
  let fixture: ComponentFixture<EnergymeterDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnergymeterDetailsComponent]
    });
    fixture = TestBed.createComponent(EnergymeterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
