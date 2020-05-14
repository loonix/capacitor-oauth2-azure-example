import { Component } from '@angular/core';
import {
  Plugins
} from '@capacitor/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  oauth2Options = {
    appId: 'XXXXXXXXXX-XXXXXXXXXX-XXXXXXXXX',
    authorizationBaseUrl: 'https://TENANT.b2clogin.com/tfp/TENANT.onmicrosoft.com/B2C_1_policy-signin-signup-web/oauth2/v2.0/authorize',
    accessTokenEndpoint: '',
    scope: 'https://XXXXXXX.onmicrosoft.com/TestApi4/demo.read',
    responseType: 'token',
    web: {
      redirectUrl: 'http://localhost:8100/'
    },
    android: {
      pkceEnabled: true,
      responseType: 'code',
      redirectUrl: 'com.cads.smartanchortest://oauth/redirect',
      accessTokenEndpoint: 'https://TENANT.b2clogin.com/TENANT.onmicrosoft.com/B2C_1_policy-signin-signup-web',
      handleResultOnNewIntent: true,
      handleResultOnActivityResult: true
    },
    ios: {
      pkceEnabled: true,
      responseType: 'code',
      redirectUrl: 'com.cads.smartanchortest://oauth',
      accessTokenEndpoint: 'https://TENANT.b2clogin.com/TENANT.onmicrosoft.com/B2C_1_policy-signin-signup-web',
    }
};

  refreshToken: string;
  constructor() { }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  onOAuthBtnClick() {
    const sessionToken = sessionStorage.getItem('b2c.access.token');
    console.log(sessionToken);
    Plugins.OAuth2Client.authenticate(this.oauth2Options).then(response => {
      const accessToken = response['access_token'];
      this.refreshToken = response['refresh_token'];
      sessionStorage.setItem('decoded', JSON.stringify(this.parseJwt(accessToken)));

      console.log(response);

      // go to backend
    }).catch(reason => {
      console.log(reason);
      console.error('OAuth rejected', reason);
    });
  }

  // Refreshing tokens only works on iOS/Android for now
  onOAuthRefreshBtnClick() {
    if (!this.refreshToken) {
      console.error('No refresh token found. Log in with OAuth first.');
    }
    const oauth2RefreshOptions = this.oauth2Options;
    Plugins.OAuth2Client.refreshToken(
      oauth2RefreshOptions
    ).then(response => {
      const accessToken = response['access_token'];
      // Don't forget to store the new refresh token as well!
      this.refreshToken = response['refresh_token'];
      // Go to backend
    }).catch(reason => {
      console.error('Refreshing token failed', reason);
    });
  }

  onLogoutClick() {
    Plugins.OAuth2Client.logout(
      this.oauth2Options
    ).then((a) => {
      console.log(a);
      // do something
    }).catch(reason => {
      console.error('OAuth logout failed', reason);
    });
  }
}
