import { Component,EventEmitter,Inject,OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-popup-solar',
  templateUrl: './popup-solar.component.html',
  styleUrls: ['./popup-solar.component.scss']
})
export class PopupSolarComponent implements OnInit {
  popupForm: any;
  items: FormArray;

  constructor(private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any={}
    ) {

  }

  ngOnInit(): void {
    this.popupForm = new FormGroup({
      items: new FormArray([])
    });
      this.items = this.popupForm.get('items') as FormArray;
      this.items.push(this.createItem());
    
    if(this.data){
      this.items.controls[0].patchValue({
        model:this.data.model,
       sn:this.data.sn,
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

  createItem(): FormGroup {
    return this.fb.group({
      model: '',
      sn: '',
      orientation: '',
      azimuth: '',
      inclination: '',
      complete:true,
    });
  }
  addItem(): void {
    this.items = this.popupForm.get('items') as FormArray;
    this.items.push(this.createItem());
  }

}
