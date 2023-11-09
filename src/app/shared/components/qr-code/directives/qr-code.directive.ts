import { Directive, HostListener, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeComponent } from '../qr-code/qr-code.component';
import { QrCodeDialog } from '../models/qr-code-dialog.interface';
import { IQrCodeData } from '../../qr-code-scanner/models/qr-code-data.interface';

@Directive({
  selector: '[appQrCode]',
})
export class QrCodeDirective {
  @Input() data: IQrCodeData;
  @Input() header: string;
  constructor(private dialog: MatDialog) {}

  @HostListener('click', ['$event'])
  onClick() {
    this.dialog.open<QrCodeComponent, unknown, QrCodeDialog>(QrCodeComponent, {
      width: '500px',
      data: {
        header: this.header,
        qrCodeData: this.data,
      },
      maxWidth: '100%',
    });
  }
}
