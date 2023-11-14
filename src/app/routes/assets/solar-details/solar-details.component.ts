import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solar-details',
  templateUrl: './solar-details.component.html',
  styleUrls: ['./solar-details.component.scss']
})
export class SolarDetailsComponent {
  @Input() solarDetails:any; 

  constructor() {
    console.log(this.solarDetails);
  }

}
