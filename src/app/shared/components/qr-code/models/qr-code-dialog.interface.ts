import { IQrCodeData } from '../../qr-code-scanner/models/qr-code-data.interface';

export interface QrCodeDialog {
  header: string;
  qrCodeData: IQrCodeData;
}
