/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AssetsRegisterService } from 'src/app/shared/services/assets-register/assets-register.service';
import { LoadingService } from 'src/app/shared/services/loading.service';


const WirelessPodType = {
  ModbusRTU: 'ModbusRTU',
};

@Component({
  selector: 'app-register-asset',
  templateUrl: './register-asset.component.html',
  styleUrls: ['./register-asset.component.scss']
})
export class RegisterAssetComponent implements OnInit {
  public WirelessPodType = WirelessPodType;
  public assetForm = this.fb.group({
    wirelessType: '',
    wirelessSn: '',
    wirelessPublicKey: '',
    solarPeakPower: '',
    solarInverterType: '',
    solarInverterSn: '',
    solarLocation: '',
    solarPanels: [],
    solarStructureDescription: '',
    solarStructureCount: '',
    solarCablingDescription: '',
    solarCablingLength: '',
    solarCabinetAcDescription: '',
    solarCabinetAcCount: '',
    solarCabinetDcDescription: '',
    solarCabinetDcCount: '',
    solarPictures: [],
    energyType: '',
    energySn: '',
  });
  public submitting = false;
  public roleList: any;
  public isPrecheckSuccess = false;

  apiLoaded: Observable<boolean>;
  srcResult: any;
  selectedImage: string;
  pictures: any[]=[];
  editMapOn:boolean;
  locationMarker:any;
  showDetails:string = '';
  solarDetails:any;
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private assetRegisterService: AssetsRegisterService,
  ) {
  }

  ngOnInit(): void {
    
  }

  openDetails(panel:string) {
    // panel : 'solar powerplant' | 'energymeter'
    if(this.showDetails != panel) {
      this.showDetails = panel;
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

  async enrolForSelected(e: any) {
    this.resetForm();
  }

  private resetForm() {
    // todo
  }

  selectAsset() {
    // todo
  }

  roleTypeSelected(e: any) {
    // todo
  }
  async handleScannedValue(data: any) {
    console.log('handleScannedValue: ', data)
    this.loadingService.show();
    // ZDMxM2E1ZDMtYWhsYi00ODZmLTl0NjAtN2UwYmNlZDY1ZTdm
    const res: any = await this.assetRegisterService.getAssetDetail(data);
    this.loadingService.hide();
    console.log('getAssetDetail: ', res);
    const wirelessForm = res.assetTree.find((item) => item.assetType === 'wireless pod');
    const solarForm = res.assetTree.find((item) => item.assetType === 'solar powerplant');
    const energyForm = res.assetTree.find((item) => item.assetType === 'energymeter');
    console.log(solarForm?.assetType);
    this.solarDetails = solarForm; 
    
    if(solarForm?.assetType){
      this.pictures = solarForm?.pictures

    }
    this.assetForm.patchValue({
      wirelessType: wirelessForm.assetSpec.model,
      wirelessSn: wirelessForm.assetSpec.sn,
      wirelessPublicKey: wirelessForm.assetSpec.pubKey,
      solarPeakPower: solarForm.assetSpec.peakPower,
      solarLocation: solarForm.assetSpec.location,
      solarInverterType: solarForm.assetSpec.inverter.model,
      solarInverterSn: solarForm.assetSpec.inverter.sn,
      solarPanels: solarForm.panels,
      solarStructureDescription: solarForm.structure.description,
      solarStructureCount: solarForm.structure.count,
      solarCablingDescription: solarForm.cabling.description,
      solarCablingLength: solarForm.cabling.length,
      solarCabinetAcDescription: solarForm.cabinetAc.description,
      solarCabinetAcCount: solarForm.cabinetAc.count,
      solarCabinetDcDescription: solarForm.cabinetDc.description,
      solarCabinetDcCount: solarForm.cabinetDc.count,
      solarPictures: solarForm.pictures,
      energyType: energyForm.assetSpec.model,
      energySn: solarForm.assetSpec.sn,
    });
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

  async onSave() {
    this.loadingService.show();
    await this.assetRegisterService.registerAsset();
    this.loadingService.hide();
  }

}
