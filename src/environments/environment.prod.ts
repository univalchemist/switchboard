import { constants } from './constants';
import { ChainId } from '../app/core/config/chain-id';

export const environment = {
  production: true,
  theme: 'default',
  application: true,

  rpcUrl: 'https://rpc.energyweb.org/',
  chainId: ChainId.EWC,
  cacheServerUrl: 'https://identitycache.energyweb.org/v1',
  natsServerUrl: 'https://identityevents.energyweb.org/',
  ekcUrl: 'https://azure-proxy-server.energyweb.org/api/v1',
  backendUrl: ' http://api2.kistelek.eu:4000/v1',
  authUsername: 'test73',
  authPassword: 's0mepasS^',
  showAzureLoginOption: false,
  natsEnvironmentName: 'ewf-prod',
  rootNamespace: 'auth.ewc',

  fullNetworkName: 'Energy Web Chain',
  networkName: 'EWC',
  currencyName: 'EWT',
  currencySymbol: 'EWT',
  blockExplorerUrl: 'https://explorer.energyweb.org',
  SENTRY_ENVIRONMENT: 'production',
  idleTime: 900, // User was in inactivity for 15 mins(Idle is detected)
  idleTimeout: 900, // 15mins after detected idle
  orgRequestEmail: 'iamteam@energyweb.org', //to do: create generic IAM email for inbound requests
  ...constants,
};
