import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-energymeter-details',
  templateUrl: './energymeter-details.component.html',
  styleUrls: ['./energymeter-details.component.scss']
})
export class EnergymeterDetailsComponent {
  @Input() energyMeterDetails:any; 
  @Output() sendBackData: EventEmitter<any> = new EventEmitter();


  public energyMeterForm = this.fb.group({
    model:'',
    sn:'',
  });


  constructor(private fb: FormBuilder,
    ) {
      this.energyMeterForm.valueChanges.subscribe(res=>{
        Object.keys(res).forEach(key => {
          this.energyMeterDetails.assetSpec[key] = res[key];
        })
        this.sendDataBack();
    });


  }

  ngOnInit(): void {
    if(this.energyMeterDetails){
      this.energyMeterForm.patchValue({
        model:this.energyMeterDetails?.assetSpec.model,
        sn:this.energyMeterDetails?.assetSpec.sn,
      })
    } else {
      this.energyMeterDetails = { assetSpec: {}}
    }    
    this.sendDataBack();
  }

  close(){
  }

  sendDataBack() {
    this.sendBackData.emit(this.energyMeterDetails);
  }

}
