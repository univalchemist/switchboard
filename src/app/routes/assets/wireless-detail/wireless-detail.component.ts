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
  @Output() sendBackData: EventEmitter<any> = new EventEmitter();


  public isButtonDisabled: boolean;

  public wireFrameForm = this.fb.group({
    model:'',
    sn:'',
    pubKey:''
  });


  constructor(private fb: FormBuilder,
    ) {
      this.wireFrameForm.valueChanges.subscribe(res=>{
          Object.keys(res).forEach(key => {
            this.wirelessDetails.assetSpec[key] = res[key];
          })
          this.sendDataBack();
      });
  }

  ngOnInit(): void {
    if(this.wirelessDetails){
      this.wireFrameForm.patchValue({
        model:this.wirelessDetails?.assetSpec.model,
        pubKey:this.wirelessDetails?.assetSpec.pubKey,
        sn:this.wirelessDetails?.assetSpec.sn,
      })
    } else {
      this.wirelessDetails = { assetSpec: {}}
    }    
    this.sendDataBack();
  }

  sendDataBack() {
    this.sendBackData.emit(this.wirelessDetails);
  }


  close(){
  }

}
