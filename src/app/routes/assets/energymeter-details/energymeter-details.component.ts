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
  @Output() showErrorEnergyMeter: EventEmitter<any> = new EventEmitter();
  public isBtnForEnergyMeter: boolean;
  public formValueChangeSubscription :Subscription;


  public energyMeterForm = this.fb.group({
    model:'',
    sn:'',
  });


  constructor(private fb: FormBuilder,
    ) {
      this.energyMeterForm.valueChanges.subscribe(res=>{
        this.formValueChangeSubscription = this.energyMeterForm.valueChanges.subscribe(() => {
          this.isBtnForEnergyMeter = Object.keys(this.energyMeterForm.controls).some(formKey => !this.energyMeterForm.controls[formKey].value);
          this.showErrorEnergyMeter.emit(this.isBtnForEnergyMeter)
        })
      })

  }

  ngOnInit(): void {
   if(this.energyMeterDetails){
    this.energyMeterForm.patchValue({
      model:this.energyMeterDetails?.assetSpec.model,
      sn:this.energyMeterDetails?.assetSpec.sn,
    })
    this.isBtnForEnergyMeter = Object.keys(this.energyMeterForm.controls).some(formKey => !this.energyMeterForm.controls[formKey].value);
    this.showErrorEnergyMeter.emit(this.isBtnForEnergyMeter)
   }
  }

  close(){
  }

}
