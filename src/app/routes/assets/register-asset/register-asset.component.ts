import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import mapboxgl from 'mapbox-gl';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssetsRegisterService } from 'src/app/shared/services/assets-register/assets-register.service';
import { EnvService } from 'src/app/shared/services/env/env.service';
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

  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  lat = 37.75;
  lng = -122.41;
  editMapOn:boolean;
  locationMarker:any;
  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private assetRegisterService: AssetsRegisterService,
    httpClient: HttpClient,
    private envService: EnvService
  ) {
  }

  ngOnInit(): void {
    mapboxgl.accessToken = this.envService.MAP_BOX_TOKEN;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 18,
        center: [this.lng, this.lat]
    });
    this.map.on('click', (e) => {
      if(this.editMapOn) {
        if(this.locationMarker) { 
          this.locationMarker.remove();
        }
        this.locationMarker = new mapboxgl.Marker().setLngLat([e?.lngLat?.lat, e?.lngLat?.lng]).addTo(this.map);
      }
     
    })
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

  handleScannedValue(data: any) {
    // todo
    console.log('handleScannedValue: ', data)
  }

  async test() {
    this.loadingService.show();
    const res: any = await this.assetRegisterService.getAssetDetail('ZDMxM2E1ZDMtYWhsYi00ODZmLTl0NjAtN2UwYmNlZDY1ZTdm');
    this.loadingService.hide();
    console.log('getAssetDetail: ', res);
    const wirelessForm = res.assetTree.find((item) => item.assetType === 'wireless pod');
    const solarForm = res.assetTree.find((item) => item.assetType === 'solar powerplant');
    const energyForm = res.assetTree.find((item) => item.assetType === 'energymeter');
    console.log(solarForm?.assetType);
    
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

  onFileSelected(target:any) {
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

}
