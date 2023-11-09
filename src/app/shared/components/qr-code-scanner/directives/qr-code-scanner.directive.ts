import {
  Directive,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrCodeScannerComponent } from '../components/qr-code-scanner.component';
import { filter } from 'rxjs/operators';
import { IQrCodeData } from '../models/qr-code-data.interface';
import { Observable } from 'rxjs';
import { QrCodeScannerService } from '../services/qr-code-scanner.service';

@Directive({
  selector: '[appQrCodeScanner]',
})
export class QrCodeScannerDirective {
  @Input() detect = false;
  @Output() scannedValue = new EventEmitter<IQrCodeData>();

  constructor(
    private dialog: MatDialog,
    private qrCodeScannerService: QrCodeScannerService
  ) {}

  @HostListener('click', ['$event'])
  onClick() {
    const afterClosed = this.dialog
      .open<QrCodeScannerComponent, unknown, IQrCodeData>(
        QrCodeScannerComponent,
        {
          width: '100%',
          height: '100vh',
          maxHeight: '100vh',
          maxWidth: '100%',
        }
      )
      .afterClosed()
      .pipe(filter((qrCodeData) => !!qrCodeData));

    this.handleScannedValue(afterClosed);
    this.detectDefaultBehaviour(afterClosed);
  }

  private handleScannedValue(closed: Observable<IQrCodeData>) {
    closed
      .pipe(filter(() => !this.detect))
      .subscribe((data: IQrCodeData) => this.scannedValue.emit(data));
  }

  private detectDefaultBehaviour(closed: Observable<IQrCodeData>) {
    closed
      .pipe(filter(() => this.detect))
      .subscribe((data: IQrCodeData) =>
        this.qrCodeScannerService.dataFactory(data)
      );
  }
}
