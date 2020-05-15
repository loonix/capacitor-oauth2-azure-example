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
