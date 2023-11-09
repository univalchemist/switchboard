import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-raw-data',
  templateUrl: './raw-data.component.html',
  styleUrls: ['./raw-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RawDataComponent {
  @Input() data: object | string;
  @Input() message: string;

  get stringifyData() {
    return JSON.stringify(this.data);
  }
}
