import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IQrCodeData } from '../models/qr-code-data.interface';
import { ScanType } from '../models/scan-type.enum';

@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss'],
})
export class QrCodeScannerComponent {
  constructor(private dialogRef: MatDialogRef<QrCodeScannerComponent>) {}

  scanned(result: any) {
    if (!result) {
      return;
    }
    try {
      if (typeof result === 'string') {
        const res: IQrCodeData = {
          type: ScanType.Unknown,
          data: result,
        };
        this.dialogRef.close(res);
      } else {
        this.dialogRef.close(result as IQrCodeData);
      }
    } catch (e) {
      console.error(e.message);
    }
  }

  cancelScan() {
    this.dialogRef.close();
  }
}
