import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrScannerComponent } from './qr-scanner.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: QrScannerComponent }];

@NgModule({
  declarations: [QrScannerComponent],
  imports: [
    CommonModule,
    ZXingScannerModule,
    RouterModule.forChild(routes),
    RouterModule,
  ],
})
export class QrScannerModule {}
