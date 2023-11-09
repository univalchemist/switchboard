import { ScanType } from './scan-type.enum';

export interface IQrCodeData {
  type: ScanType;
  data: any;
}
