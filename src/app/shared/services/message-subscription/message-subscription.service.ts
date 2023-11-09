import { Injectable, OnDestroy } from '@angular/core';
import { IamService } from '../iam.service';
import { AssetHistoryEventType, ClaimEventType } from 'iam-client-lib';
import { SwitchboardToastrService } from '../switchboard-toastr.service';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root',
})
export class MessageSubscriptionService implements OnDestroy {
  private subscriptionId: number;
  constructor(
    private iamService: IamService,
    private toastr: SwitchboardToastrService,
    private notifService: NotificationService
  ) {}

  ngOnDestroy() {
    this.iamService.messagingService.unsubscribeFrom(this.subscriptionId);
  }

  async init() {
    this.subscriptionId = await this.iamService.messagingService.subscribeTo({
      messageHandler: this.handleMessage.bind(this),
    });
  }

  private handleMessage(message: {
    type: ClaimEventType & AssetHistoryEventType;
  }) {
    if (message.type) {
      this.handleAssetEvents(message.type);
      this.handleClaimEvents(message.type);
    }
  }

  private handleAssetEvents(type: AssetHistoryEventType) {
    switch (type) {
      case AssetHistoryEventType.ASSET_OFFERED:
        this.toastr.info(
          $localize`An asset is offered to you.`,
          $localize`Asset Offered`
        );
        this.notifService.increaseAssetsOfferedToMeCount();
        break;
      case AssetHistoryEventType.ASSET_TRANSFERRED:
        this.toastr.success(
          $localize`Your asset is successfully transferred to a new owner.`,
          $localize`Asset Transferred`
        );
        break;
      case AssetHistoryEventType.ASSET_OFFER_CANCELED:
        this.toastr.warning(
          $localize`An asset offered to you is cancelled by the owner.`,
          $localize`Asset Offer Cancelled`
        );
        this.notifService.decreaseAssetsOfferedToMeCount();
        break;
      case AssetHistoryEventType.ASSET_OFFER_REJECTED:
        this.toastr.warning(
          $localize`An asset you offered is rejected.`,
          $localize`Asset Offer Rejected`
        );
        break;
    }
  }

  private handleClaimEvents(type: ClaimEventType) {
    switch (type) {
      case ClaimEventType.REQUEST_CREDENTIALS:
        this.notifService.updatePendingApprovalList();
        this.toastr.info(
          $localize`A new enrolment request is waiting for your approval.`,
          $localize`New Enrolment Request`
        );
        break;
      case ClaimEventType.ISSUE_CREDENTIAL:
        this.notifService.updatePendingPublishList();
        this.toastr.info(
          $localize`Your enrolment request is approved. Please sync your approved claims in your DID Document.`,
          $localize`Enrolment Approved`
        );
        break;
      case ClaimEventType.REJECT_CREDENTIAL:
        this.notifService.updatePendingApprovalList();
        this.toastr.warning(
          $localize`Your enrolment request is rejected.`,
          $localize`New Enrolment Request`
        );
        break;
    }
  }
}
