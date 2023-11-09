import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AssetService } from '../services/asset.service';

@Component({
  selector: 'app-new-passive-asset',
  templateUrl: './new-passive-asset.component.html',
  styleUrls: ['./new-passive-asset.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPassiveAssetComponent {
  constructor(
    private dialogRef: MatDialogRef<NewPassiveAssetComponent>,
    private assetsService: AssetService
  ) {}

  registerAsset() {
    this.assetsService.register().subscribe(
      (res: string) => this.closeDialog(true, res),
      () => this.closeDialog(false)
    );
  }

  closeDialog(isSuccess?: boolean, assetDid?: string) {
    this.dialogRef.close({ success: !!isSuccess, res: assetDid });
  }
}
