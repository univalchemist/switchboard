import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AssetHistory, AssetHistoryEventType } from 'iam-client-lib';

export interface Period extends AssetHistory {
  type: AssetHistoryEventType;
}

@Component({
  selector: 'app-history-period',
  templateUrl: './history-period.component.html',
  styleUrls: ['./history-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryPeriodComponent {
  @Input() period: Period;

  getTopPart() {
    if (!this.period) {
      return;
    }
    if (this.period.type === AssetHistoryEventType.ASSET_TRANSFERRED) {
      return {
        header: $localize`Offered from`,
        did: this.period.relatedTo,
      };
    }
    return {
      header: $localize`Owner`,
      did: this.period.emittedBy,
    };
  }

  getBottomPart() {
    if (!this.period) {
      return;
    }
    if (this.period.type === AssetHistoryEventType.ASSET_TRANSFERRED) {
      return {
        header: $localize`Owner`,
        did: this.period.emittedBy,
      };
    }
    return {
      header: $localize`Offered to`,
      did: this.period.relatedTo,
    };
  }
}
