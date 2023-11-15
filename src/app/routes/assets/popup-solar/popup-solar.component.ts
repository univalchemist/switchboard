import { Component,EventEmitter,Inject,OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-popup-solar',
  templateUrl: './popup-solar.component.html',
  styleUrls: ['./popup-solar.component.scss']
})
export class PopupSolarComponent implements OnInit {
  public popupForm = this.fb.group({
    type:'',
    serial:'',
    orientation:'',
    azimuth:'',
    inclination:'',
  });

  constructor(private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any={}
    ) {

  }

  ngOnInit(): void {
    if(this.data){
      this.popupForm.patchValue({
       type:this.data.model,
       serial:this.data.sn,
       orientation:this.data.orientation,
       azimuth:this.data.azimuth,
       inclination:this.data.inclination,
      })
    }
    
  }

  close(){
    this._bottomSheet.dismiss()
  }
  save(){
    this._bottomSheet.dismiss(this.popupForm.value)

  }

}
