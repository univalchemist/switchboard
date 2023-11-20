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
  @Input() solarDetails: any;
  public solarDetailsForm = this.fb.group({
    solarPeakPower: '',
    location: '',
    strDescription: '',
    strCount: '',
    invType: '',
    invSerial: '',
    cabeDescription: '',
    cabeLength: '',
    acDescription: '',
    acCount: '',
    dcDescription: '',
    dcCount: '',
  });
  editMapOn: boolean;
  locationMarker: any;
  step = 0;
  pictures: any[] = [];
  selectedImage: string;
  solarPanelsDetails: any[] = [];
  selectAll = true;
  @Output() sendBackData: EventEmitter<any> = new EventEmitter();
  public isButtonDisabled: boolean;
  public formValueChangeSubscription: Subscription;
  notSelectedPannel: boolean = false;


  constructor(
    private fb: FormBuilder,
    private _bottomSheet: MatBottomSheet
  ) {
    this.solarDetailsForm.valueChanges.subscribe(res => {
      Object.keys(res).forEach(key => {
        this.checkKeys(key,res)

      })
      this.sendDataBack();
    });
  }


  checkKeys(key,res) {
    switch (key) {
      case 'solarPeakPower':
   this.solarDetails.assetSpec.peakPower = res['solarPeakPower']
        break;
      case 'location':
           this.solarDetails.assetSpec.location = res['location']
        break;
      case 'strDescription':
           this.solarDetails.structure.description = res['strDescription']

        break;
      case 'strCount':
           this.solarDetails.structure.count = res['strCount']
        break;
      case 'invType':
           this.solarDetails.assetSpec.inverter.model = res['invType']

        break;
      case 'invSerial':
           this.solarDetails.assetSpec.inverter.sn = res['invSerial']

        break;
      case 'cabeDescription':
           this.solarDetails.cabling.description = res['cabeDescription']
        break;
      case 'cabeLength':
           this.solarDetails.cabling.length = res['cabeLength']

        break;
      case 'acDescription':
           this.solarDetails.cabinetAc.description = res['acDescription']
        break;
      case 'acCount':
           this.solarDetails.cabinetAc.count = res['acCount']

        break;
      case 'dcDescription':
           this.solarDetails.cabinetDc.description = res['dcDescription']
        break;
      case 'dcCount':
           this.solarDetails.cabinetDc.count = res['dcCount']
        break;
    }
  }

  async ngOnInit() {
    if (this.solarDetails) {
      this.solarDetailsForm.patchValue({
        solarPeakPower: this.solarDetails?.assetSpec.peakPower,
        location: this.solarDetails?.assetSpec.location,
        strDescription: this.solarDetails?.structure.description,
        strCount: this.solarDetails?.structure.count,
        invType: this.solarDetails?.assetSpec.inverter.model,
        invSerial: this.solarDetails?.assetSpec.inverter.sn,
        cabeDescription: this.solarDetails.cabling.description,
        cabeLength: this.solarDetails.cabling.length,
        acDescription: this.solarDetails?.cabinetAc.description,
        acCount: this.solarDetails?.cabinetAc.count,
        dcDescription: this.solarDetails?.cabinetDc.description,
        dcCount: this.solarDetails?.cabinetDc.count,
      })
      this.pictures = this.solarDetails?.pictures;
       this.solarPanelsDetails = await this.solarDetails?.panels.map(i => { i.complete = true; return i; });
    } else {
      this.solarDetails = { assetSpec: {} }
    }
    this.sendDataBack();


  }

  changeLocation(event: any) {
    if (event.longitude && event.latitude) {
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

  removeImage(idx) {
    if (idx >= 0 && idx < this.pictures.length) {
      this.pictures.splice(idx, 1)
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  openPopup(d?: any) {
    const bottomSheetRef = this._bottomSheet.open(PopupSolarComponent, {
      panelClass: 'custom-width',
      data: d
    })
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      if (dataFromChild) {
        dataFromChild.complete = false;
        this.solarPanelsDetails = this.solarPanelsDetails?.concat(dataFromChild.items);
      }
    });
  }
  updateAllComplete() {

  }
  viewSolarDetail(data) {
    this.openPopup(data)
  }

  toggleSelectAll() {
    this.solarDetails.SelectedPnael=[]
    this.notSelectedPannel = false;
    this.solarPanelsDetails = this.solarPanelsDetails.map(item => { item.complete = this.selectAll; return item });
    let result:any[] = this.solarDetails?.panels.map(i => { if (i.complete == true) { return i; } })
    result.forEach(i=>{if(i){this.solarDetails.SelectedPnael.push(i)}})
    this.sendDataBack()
  }
  selectOnce(idx, checked) {
    this.solarDetails.SelectedPnael=[]
    this.solarPanelsDetails[idx].complete = checked.checked;
    this.notSelectedPannel = false;
    let result = this.solarDetails?.panels.map(i => { if (i.complete == true) { return i; } })
    result.forEach(i=>{if(i){this.solarDetails.SelectedPnael.push(i)}})
    this.sendDataBack()

  }

  sendDataBack() {
    console.log(this.solarDetails,'solar details');
    
    this.sendBackData.emit(this.solarDetails);
  }

}
