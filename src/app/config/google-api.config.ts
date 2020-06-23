import { NgGapiClientConfig } from 'ng-gapi';

export const gapiClientConfig: NgGapiClientConfig = {
  client_id: '938430199904-pd8up38blda9839p5h6er0n2dk4afhi5.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest'],
  scope: ['https://www.googleapis.com/auth/blogger'].join(' '),
};
