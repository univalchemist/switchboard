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
  energyMeterDetails: any;
  wirelessDetails: any;
  ShowCompleteWireless: boolean = true;
  ShowCompleteEnergy: boolean = true;
  ShowCompleteSolarPanel: boolean = true;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private assetRegisterService: AssetsRegisterService,
  ) {
    this.assetForm.valueChanges.subscribe(res => {
      this.formChanges(res);
    })
  }

  ngOnInit(): void {
    
  }

  openDetails(panel:string) {
    // panel : 'solar powerplant' | 'energymeter'
    if(this.showDetails != panel) {
      this.showDetails = panel;
      if(this.showDetails == 'solar powerplant')
      this.ShowCompleteSolarPanel = false
      else if(this.showDetails == 'energymeter')
        this.ShowCompleteEnergy = false
      if(this.showDetails == 'Wireless Pods')
       this.ShowCompleteWireless = false
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
    const wirelessForm = res.assetTree.find((item) => item.assetType === 'wireless pod');
    const solarForm = res.assetTree.find((item) => item.assetType === 'solar powerplant');
    const energyForm = res.assetTree.find((item) => item.assetType === 'energymeter');
    this.solarDetails = solarForm; 
    this.energyMeterDetails = energyForm;
    this.wirelessDetails = wirelessForm;
    if(this.wirelessDetails){
      this.ShowCompleteWireless = false;
    }
    if(this.energyMeterDetails){
      this.ShowCompleteEnergy = false;
    }
    if(this.solarDetails){
      this.ShowCompleteSolarPanel = false;
    }
    if(solarForm?.assetType){
      this.pictures = solarForm?.pictures
    }
    this.solarDetails.SelectedPnael = []
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
        this.solarDetails.pictures.push(this.selectedImage)
      };
  }

  removeImage(idx){
    if(idx >= 0 && idx < this.pictures.length){
      this.pictures.splice(idx,1);
      this.checkSolarEmptyForCurrent()
    }
  }

  async onSave() {
    this.loadingService.show();
    console.log(this.assetRegisterService.registerAsset());
    
    // await this.assetRegisterService.registerAsset();
    this.loadingService.hide();
  }



  mapBackWireless(dataValues) {
    if(!this.wirelessDetails) {
      this.wirelessDetails = {assetSpec : {}}
    }
    this.wirelessDetails.assetSpec.model = dataValues?.assetSpec?.model;
    this.wirelessDetails.assetSpec.sn = dataValues?.assetSpec?.sn;
    this.wirelessDetails.assetSpec.pubKey = dataValues?.assetSpec?.pubKey;
    this.assetForm.patchValue({
      wirelessType: this.wirelessDetails.assetSpec.model,
      wirelessSn: this.wirelessDetails.assetSpec.sn,
      wirelessPublicKey: this.wirelessDetails.assetSpec.pubKey,
    })
    this.checkWirelessEmpty();
  }
  mapBackEnergyMeter(dataValues){
    if(!this.wirelessDetails) {
      this.wirelessDetails = {assetSpec : {}}
    }
    this.energyMeterDetails.assetSpec.model = dataValues?.assetSpec?.model;
    this.energyMeterDetails.assetSpec.sn = dataValues?.assetSpec?.sn;
    this.energyMeterDetails.assetSpec.pubKey = dataValues?.assetSpec?.pubKey;
    this.assetForm.patchValue({
      energyType: this.energyMeterDetails.assetSpec.model,
      energySn: this.energyMeterDetails.assetSpec.sn,

    })
    this.checkEnergyEmpty()
  }
  mapBackSolarPanel(dataValues){
    if(!this.wirelessDetails) {
      this.wirelessDetails = {assetSpec : {}}
    }
    console.log(dataValues,'fjeyfgj');
    
    this.assetForm.patchValue({
      solarPeakPower: dataValues.assetSpec.peakPower,
      solarLocation: dataValues.assetSpec.location,
      solarInverterType: dataValues.assetSpec.inverter.model,
      solarInverterSn: dataValues.assetSpec.inverter.sn,
      solarPanels: dataValues.panels,
      solarStructureDescription: dataValues.structure.description,
      solarStructureCount: dataValues.structure.count,
      solarCablingDescription: dataValues.cabling.description,
      solarCablingLength: dataValues.cabling.length,
      solarCabinetAcDescription: dataValues.cabinetAc.description,
      solarCabinetAcCount: dataValues.cabinetAc.count,
      solarCabinetDcDescription: dataValues.cabinetDc.description,
      solarCabinetDcCount: dataValues.cabinetDc.count,
    });
    this.checkSolarEmpty()
  }

  
  checkWirelessEmpty() {
    this.ShowCompleteWireless = (!this.assetForm.value.wirelessSn || !this.assetForm.value.wirelessPublicKey || !this.assetForm.value.wirelessType)
  }
  checkEnergyEmpty() {
    this.ShowCompleteEnergy = (!this.energyMeterDetails.assetSpec.model || !this.energyMeterDetails.assetSpec.sn);
    
  }
  checkSolarEmpty() {
    console.log(this.solarDetails.SelectedPnael);
    
    this.ShowCompleteSolarPanel = (!this.assetForm.value.solarPeakPower || !this.assetForm.value.solarLocation || !this.assetForm.value.solarInverterType || !this.assetForm.value.solarInverterSn || !this.assetForm.value.solarStructureDescription || !this.assetForm.value.solarStructureCount || !this.assetForm.value.solarCablingDescription || !this.assetForm.value.solarCablingLength || !this.assetForm.value.solarCabinetAcDescription || !this.assetForm.value.solarCabinetAcCount || this.assetForm.value.solarPictures.length <= 0 || !this.solarDetails.SelectedPnael.length);
    
  }
  checkSolarEmptyForCurrent() {
    this.ShowCompleteSolarPanel = (!this.assetForm.value.solarPeakPower || !this.assetForm.value.solarInverterType || this.solarDetails.pictures.length <= 0);
    
  }
  

  formChanges(res) {
    if(res) {
      if(!this.wirelessDetails) { this.wirelessDetails = { assetSpec:{} }};
      if(!this.energyMeterDetails) { this.energyMeterDetails = { assetSpec:{} }};
      if(!this.solarDetails) { this.solarDetails = { assetSpec:{} }};
      
      // wireless
      this.wirelessDetails.assetSpec['model'] = res.wirelessType;
      this.wirelessDetails.assetSpec['sn'] = res.wirelessSn;
      this.wirelessDetails.assetSpec['pubKey'] = res.wirelessPublicKey;
      this.checkWirelessEmpty();
      
      this.solarDetails.assetSpec['peakPower'] = res.solarPeakPower,
      this.solarDetails.assetSpec.inverter.model = res.solarInverterType;
      this.checkSolarEmptyForCurrent();
      this.checkEnergyEmpty()
    }
  }

}
