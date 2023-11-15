import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-energymeter-details',
  templateUrl: './energymeter-details.component.html',
  styleUrls: ['./energymeter-details.component.scss']
})
export class EnergymeterDetailsComponent {
  public energyMeterForm = this.fb.group({
    type:'',
    serial:'',
  });


  constructor(private fb: FormBuilder,
    ) {

  }

  ngOnInit(): void {
   
    
  }

  close(){
  }

}
