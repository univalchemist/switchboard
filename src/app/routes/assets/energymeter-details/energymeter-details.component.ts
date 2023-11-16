import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-energymeter-details',
  templateUrl: './energymeter-details.component.html',
  styleUrls: ['./energymeter-details.component.scss']
})
export class EnergymeterDetailsComponent {
  @Input() energyMeterDetails:any; 

  public energyMeterForm = this.fb.group({
    type:'',
    serial:'',
  });


  constructor(private fb: FormBuilder,
    ) {

  }

  ngOnInit(): void {
   if(this.energyMeterDetails){
    this.energyMeterForm.patchValue({
      type:this.energyMeterDetails?.assetSpec.model,
    serial:this.energyMeterDetails?.assetSpec.sn,
    })
   }
  }

  close(){
  }

}
