import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolarDetailsComponent } from './solar-details.component';

describe('SolarDetailsComponent', () => {
  let component: SolarDetailsComponent;
  let fixture: ComponentFixture<SolarDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolarDetailsComponent]
    });
    fixture = TestBed.createComponent(SolarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
