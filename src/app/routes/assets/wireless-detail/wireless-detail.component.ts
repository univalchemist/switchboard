import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-wireless-detail',
  templateUrl: './wireless-detail.component.html',
  styleUrls: ['./wireless-detail.component.scss']
})
export class WirelessDetailComponent {
  @Input() wirelessDetails:any; 
  @Output() showErrorWireless: EventEmitter<any> = new EventEmitter();


  public isButtonDisabled: boolean;
  public formValueChangeSubscription :Subscription;

  public wireFrameForm = this.fb.group({
    type:'',
    serial:'',
    publicKey:''
  });


  constructor(private fb: FormBuilder,
    ) {
      this.wireFrameForm.valueChanges.subscribe(res=>{
        this.formValueChangeSubscription = this.wireFrameForm.valueChanges.subscribe(() => {
          this.isButtonDisabled = Object.keys(this.wireFrameForm.controls).some(formKey => !this.wireFrameForm.controls[formKey].value);
          this.showErrorWireless.emit(this.isButtonDisabled)
        })
      })
  }

  ngOnInit(): void {
    if(this.wirelessDetails){
      this.wireFrameForm.patchValue({
        type:this.wirelessDetails?.assetSpec.model,
        publicKey:this.wirelessDetails?.assetSpec.pubKey,
        serial:this.wirelessDetails?.assetSpec.sn,
      })
     }
     if(this.wirelessDetails?.assetSpec.model && this.wirelessDetails?.assetSpec.pubKey && this.wirelessDetails?.assetSpec.sn){
      this.isButtonDisabled = false;
      this.showErrorWireless.emit(this.isButtonDisabled)
     }
    
  }


  close(){
  }

}
