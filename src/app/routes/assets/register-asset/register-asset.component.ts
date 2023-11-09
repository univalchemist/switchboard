import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private assetRegisterService: AssetsRegisterService,
    httpClient: HttpClient
  ) {
  }

  ngOnInit(): void {
    //todo
    console.log("todo")
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

}
