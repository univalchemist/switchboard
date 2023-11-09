import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAssetComponent } from './register-asset.component';

describe('RegisterAssetComponent', () => {
  let component: RegisterAssetComponent;
  let fixture: ComponentFixture<RegisterAssetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAssetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
