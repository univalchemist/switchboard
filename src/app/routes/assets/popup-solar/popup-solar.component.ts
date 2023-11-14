import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-popup-solar',
  templateUrl: './popup-solar.component.html',
  styleUrls: ['./popup-solar.component.scss']
})
export class PopupSolarComponent {
  public popupForm = this.fb.group({
    type:'',
    serial:'',
    orientation:'',
    azimuth:'',
    inclination:'',
  });


  constructor(private fb: FormBuilder) {

  }
}
