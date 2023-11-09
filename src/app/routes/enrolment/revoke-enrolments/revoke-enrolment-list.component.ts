import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { EnrolmentClaim } from '../models/enrolment-claim';
import {
  ColumnDefinition,
  ColumnType,
} from '../../../shared/components/table/generic-table/generic-table.component';
import { EnrolmentListType } from '../enrolment-list/models/enrolment-list-type.enum';
import { RevokeService } from '../services/revoke/revoke.service';
import { CascadingFilterService } from '../../../modules/cascading-filter/services/cascading-filter/cascading-filter.service';

@Component({
  selector: 'app-revoke-enrolment-list',
  templateUrl: './revoke-enrolment-list.component.html',
  styleUrls: ['./revoke-enrolment-list.component.scss'],
  providers: [CascadingFilterService],
})
export class MyRevokablesListComponent implements OnInit {
  @ViewChild('revoke', { static: true }) revoke;
  @ViewChild('status', { static: true }) status;
  @ViewChild('actions', { static: true }) actions;
  @Input() set list(list: EnrolmentClaim[]) {
    this.cascadingFilterService.setItems(list);
  }
  @Output() refreshList = new EventEmitter<void>();
  get revokersList$() {
    return this.cascadingFilterService.getList$();
  }
  columns: ColumnDefinition[];
  enrolmentType = EnrolmentListType.REVOKER;

  constructor(
    private revokeService: RevokeService,
    private cascadingFilterService: CascadingFilterService
  ) {}

  ngOnInit() {
    this.defineColumns();
  }

  revokeOnChainClaim(element: EnrolmentClaim) {
    this.revokeService.revokeOnChain(element).subscribe(() => {
      this.updateList();
    });
  }

  revokeOffChainClaim(element: EnrolmentClaim) {
    this.revokeService.revokeOffChain(element).subscribe(() => {
      this.updateList();
    });
  }

  updateList(): void {
    this.refreshList.emit();
  }

  private defineColumns() {
    this.columns = [
      {
        type: ColumnType.Date,
        field: 'requestDate',
        header: $localize`Request Date`,
      },
      {
        type: ColumnType.String,
        field: 'roleName',
        header: $localize`Claim Name`,
      },
      {
        type: ColumnType.String,
        field: 'namespace',
        header: $localize`Parent Namespace`,
      },
      {
        type: ColumnType.DID,
        field: 'requester',
        header: $localize`Requestor DID`,
      },
      {
        type: ColumnType.Custom,
        field: 'status',
        header: $localize`Status`,
        customElement: this.status,
      },
      {
        type: ColumnType.Custom,
        field: 'revoke',
        header: $localize`Revoke`,
        customElement: this.revoke,
      },
      {
        type: ColumnType.Actions,
        field: 'actions',
        customElement: this.actions,
      },
    ];
  }
}
