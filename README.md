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
