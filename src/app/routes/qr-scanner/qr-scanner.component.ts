import { Location } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { ScanService } from 'src/app/shared/services/scanning.service';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent {
  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;

  constructor(private location: Location, private scanService: ScanService) {}

  public scanSuccessHandler($event: any) {
    this.scanService.scanResult($event);
    // subscribe result
    this.location.back();
  }
  public cancelScan() {
    // Go back to previous navigation
    this.location.back();
  }
}
