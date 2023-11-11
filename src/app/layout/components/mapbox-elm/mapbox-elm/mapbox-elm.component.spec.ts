import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxElmComponent } from './mapbox-elm.component';

describe('MapboxElmComponent', () => {
  let component: MapboxElmComponent;
  let fixture: ComponentFixture<MapboxElmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MapboxElmComponent]
    });
    fixture = TestBed.createComponent(MapboxElmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
