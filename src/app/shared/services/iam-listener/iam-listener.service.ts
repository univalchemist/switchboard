import { Injectable } from '@angular/core';
import { ProviderEvent } from 'iam-client-lib';
import { SignerFacadeService } from '../signer-facade/signer-facade.service';

@Injectable({
  providedIn: 'root',
})
export class IamListenerService {
  constructor(private signerFacade: SignerFacadeService) {}

  setListeners(callback: (config) => void) {
    this.signerFacade.on(ProviderEvent.AccountChanged, () => {
      this._displayAccountAndNetworkChanges(
        ProviderEvent.AccountChanged,
        callback
      );
    });

    this.signerFacade.on(ProviderEvent.NetworkChanged, () => {
      this._displayAccountAndNetworkChanges(
        ProviderEvent.NetworkChanged,
        callback
      );
    });

    this.signerFacade.on(ProviderEvent.Disconnected, () => {
      this._displayAccountAndNetworkChanges(
        ProviderEvent.Disconnected,
        callback
      );
    });
  }

  private _displayAccountAndNetworkChanges(
    changeType: ProviderEvent,
    callback: (config) => void
  ): void {
    const { message, title } = this.getSwalConfigInfo(changeType);
    const config = {
      title,
      text: $localize`${message} Please login again.`,
      icon: 'warning',
      closeOnClickOutside: false,
    };
    callback(config);
  }

  private getSwalConfigInfo(type: ProviderEvent) {
    switch (type) {
      case ProviderEvent.AccountChanged:
        return {
          title: $localize`Account Changed`,
          message: $localize`Account is changed.`,
        };
      case ProviderEvent.NetworkChanged:
        return {
          title: $localize`Network Changed`,
          message: $localize`Network is changed.`,
        };
      case ProviderEvent.Disconnected:
        return {
          title: $localize`Disconnected`,
          message: $localize`You are disconnected from your wallet.`,
        };
    }
  }
}
