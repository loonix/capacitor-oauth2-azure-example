# Capacitor Oauth2 Azure B2C Example

### Summary
This repo was made for getting feedback on the issue https://github.com/moberwasserlechner/capacitor-oauth2/issues/96

The current example uses the plugin: https://github.com/moberwasserlechner/capacitor-oauth2

Please follow the instructions on the plugin page if you want another type of configuration.

### What do you need to change?
`home.page.ts`
Update it with your settings `oauth2Options`.

`android\app\src\main\res\values\strings.xml`
Update the `custom_url_scheme`

`android\app\build.gradle`
update the `manifestPlaceholders` 

`capacitor.config.json`
update with your settings

.. and all references that start with `com.`

### Issues you might have

#### Redirect uri provided in the request is not registered for the client id
This might be related with any typo on the appId on the azure portal or `redirectUrl` in the `home.page.ts`


#### Bad Request
for anyone experiencing the issue `BAD REQUEST` just make sure you add the code in `android\app\src\main\java\com\cads\smartanchortest\MainActivity.java`
```typescript
... Other imports
import com.byteowls.capacitor.oauth2.OAuth2ClientPlugin; // <-- this

public class MainActivity extends BridgeActivity {
  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(OAuth2ClientPlugin.class); // <-- this
    }});
  }
}
```

#### Add `capacitor:\\localhost` as CORS exeption via CLI
`az webapp cors add --allowed-origins capacitor://localhost --name testapistage --resource-group testWeb`. 
Although for some reason `capacitor://localhost` is only shown as allowed in the CLI list, not in the portal.

#### Code to logout with capacitor oauth2 azure (IOS issue workaround)

```javascript
// Imports
import { OAuth2Client } from '@byteowls/capacitor-oauth2';
import { Plugins, registerWebPlugin, Capacitor } from '@capacitor/core';
const { Browser } = Plugins;

// URL- please change this
const urlLogout = https://${environment.tenantName}.b2clogin.com/tfp/${environment.tenantName}.onmicrosoft.com/${environment.signInPolicy}/oauth2/v2.0/logout?client_id=${environment.clientID}&response_type=token&redirect_uri=${environment.redirectUrl}&scope=openid%20offline_access%20https://XXXX.onmicrosoft.com/api/demo.read;

// In case WEB/Local
    if (Capacitor.platform === 'web') {
      await Browser.open({ url: urlLogout }).finally(() => setTimeout(() => Browser.close(), 1000));
      this.onLogoutClick();
      return;
    }
    
// Workaround to get IOS logout
    if(Capacitor.platform === 'ios'){
      await Browser.open({ url: urlLogout }).finally(() => setTimeout(() => Browser.close(), 4000));
      this.onLogoutClick();
      return;
    }
    
// In case IOS/Android
    const browser = await Browser.open({ url: urlLogout });
    Browser.close();
    this.onLogoutClick();
  }
```
