# White Label Wallet

React starter project for cross-platform wallet generation.

## Technologies

- React
- Electron
- Ionic
- Capacitor
- Npm(Npx)/Yarn

## Icons

Please generate the app icons using a 1024x1024 image and running this command:
`electron-icon-maker --input=/absolute/path/file.png --output=./relative/path/to/folder`

## Running & Building

Remember to do `yarn install` before any of the other commands.

You can find all the important scripts in the `package.json`.
Web Dev: `yarn run dev`
Desktop Dev: `yarn run dev:electron`
Web Build: `yarn build`
Desktop Build/Pack: `yarn run build:electron && yarn run pack:electron` or `yarn run build-pack:electron`

### Mobile

Mobile runs exactly like web, so it is not necessary to test on mobile while developing.
It renders inside a WebView element using Ionic.
Build mobile: `yarn run build:mobile`
Open Android Project: `yarn run open:android`
Open iOS Project: `yarn run open:ios`

## Plugin Interface

Functionality can easily be added to this project by implementing plugins. By following the sample plugin examples in the `plugins` folder, you can make your own plugin. Or you can just install an available plugin and implement it on `application-config/plugins.js`.

## Testing

All tests should go under the `tests` directory.
Unit tests: `yarn run test:unit`
E2E tests: `yarn run test:e2e`
Electron E2E tests: `yarn run test:e2e-electron`
