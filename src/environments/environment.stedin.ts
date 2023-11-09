import { constants } from './constants';
import { ChainId } from '../app/core/config/chain-id';

export const environment = {
  production: false,
  theme: 'stedin',
  application: false,

  rpcUrl: 'https://volta-rpc-vkn5r5zx4ke71f9hcu0c.energyweb.org/',
  chainId: ChainId.Volta,
  cacheServerUrl: 'https://identitycache-dev.energyweb.org/v1',
  natsServerUrl: 'https://identityevents-dev.energyweb.org/',
  ekcUrl: 'https://azure-proxy-server.energyweb.org/api/v1',
  backendUrl: ' http://api2.kistelek.eu:4000/v1',
  authUsername: 'test73',
  authPassword: 's0mepasS^',
  showAzureLoginOption: true,
  natsEnvironmentName: 'ewf-dev',
  rootNamespace: 'iam.ewc',

  fullNetworkName: 'EnergyWeb Volta Chain',
  networkName: 'EnergyWeb Volta Chain',
  currencyName: 'Volta Token',
  currencySymbol: 'VT',
  blockExplorerUrl: 'https://volta-explorer.energyweb.org',
  SENTRY_ENVIRONMENT: 'stedin',
  idleTime: 900, // User was in inactivity for 15 mins(Idle is detected)
  idleTimeout: 900, // 15mins after detected idle
  orgRequestEmail: '',
  ...constants,
};
