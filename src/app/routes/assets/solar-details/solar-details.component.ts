import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PopupSolarComponent } from '../popup-solar/popup-solar.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-solar-details',
  templateUrl: './solar-details.component.html',
  styleUrls: ['./solar-details.component.scss']
})
export class SolarDetailsComponent implements OnInit {
  @Input() solarDetails:any; 
  public solarDetailsForm = this.fb.group({
    solarPeakPower: '',
    location: '',
    strDescription:'',
    strCount:'',
    invType:'',
    invSerial:'',
    cabeDescription:'',
    cabeLength:'',
    acDescription:'',
    acCount:'',
    dcDescription:'',
    dcCount:'',
  });
  editMapOn:boolean;
  locationMarker:any;
  step = 0;
  pictures: any[]=[];
  selectedImage: string;
  solarPanels: any[]=[];
  selectAll = true;
  @Output() showSolarPanel: EventEmitter<any> = new EventEmitter();
  public isButtonDisabled: boolean;
  public formValueChangeSubscription :Subscription;
  notSelectedPannel: boolean=false;


  constructor(
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet
  ) {
    this.solarDetailsForm.valueChanges.subscribe(res=>{
      this.formValueChangeSubscription = this.solarDetailsForm.valueChanges.subscribe(() => {
        this.isButtonDisabled = Object.keys(this.solarDetailsForm.controls).some(formKey => !this.solarDetailsForm.controls[formKey].value);
        this.showSolarPanel.emit(this.isButtonDisabled);
      })
    })
  }
  
  ngOnInit(): void {
    if(this.solarDetails){
      this.solarDetailsForm.patchValue({
        solarPeakPower: this.solarDetails?.assetSpec.peakPower,
      location: this.solarDetails?.assetSpec.location,
      strDescription:this.solarDetails?.structure.description,
      strCount:this.solarDetails?.structure.count,
      invType:this.solarDetails?.assetSpec.inverter.model,
      invSerial:this.solarDetails?.assetSpec.inverter.sn,
      cabeDescription:this.solarDetails.cabling.description,
      cabeLength:this.solarDetails.cabling.length,
      acDescription:this.solarDetails?.cabinetAc.description,
      acCount:this.solarDetails?.cabinetAc.count,
      dcDescription:this.solarDetails?.cabinetDc.description,
      dcCount:this.solarDetails?.cabinetDc.count,
      })
      this.pictures = this.solarDetails?.pictures;
      this.solarPanels = this.solarDetails?.panels.map(i=>{i.complete = true; return i;});
    }
    
    
  }

  changeLocation(event:any) {
    if(event.longitude && event.latitude) {
      this.locationMarker = event;
    }
  }

  toggleEdit() {
    this.editMapOn = !this.editMapOn;
  }

  onFileSelected(target: any) {
    const chooseFile = target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(chooseFile);
    reader.onload = (event) => {
        this.selectedImage = event.target.result as string;
        this.pictures.push(this.selectedImage)
      };
  }

  removeImage(idx){
    if(idx >= 0 && idx < this.pictures.length){
      this.pictures.splice(idx,1)
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  openPopup(d?:any){
    const bottomSheetRef = this._bottomSheet.open(PopupSolarComponent,{
      panelClass: 'custom-width',
      data:d
    })
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      if(dataFromChild){
        dataFromChild.complete = false;
        this.solarPanels = this.solarPanels?.concat(dataFromChild.items);
      }
    });
  }
  updateAllComplete(){

  }
  viewSolarDetail(data){
    this.openPopup(data)
  }

  toggleSelectAll() {
    this.notSelectedPannel = false;
    this.solarPanels = this.solarPanels.map(item =>{item.complete = this.selectAll;return item});
    this.solarDetails?.panels.forEach(i=>{ if(i.complete == true){ this.notSelectedPannel = true}})
    if(this.notSelectedPannel && !this.isButtonDisabled)
    this.showSolarPanel.emit(false);
    else
    this.showSolarPanel.emit(true);

  }
  selectOnce(idx,checked){
    this.solarPanels[idx].complete = checked.checked;
    this.notSelectedPannel = false;
    this.solarDetails?.panels.forEach(i=>{ if(i.complete == true){ this.notSelectedPannel = true}})
    if(this.notSelectedPannel && !this.isButtonDisabled)
    this.showSolarPanel.emit(false);
    else
    this.showSolarPanel.emit(true);
  }

}
