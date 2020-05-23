import { NgGapiClientConfig } from 'ng-gapi';

export const gapiClientConfig: NgGapiClientConfig = {
    client_id: '1031058241493-r134mromqkib2bpc8ksqd2stj0l5f2kp.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/blogger/v3/rest'],
    scope: ['https://www.googleapis.com/auth/blogger'].join(' ')
  };
  