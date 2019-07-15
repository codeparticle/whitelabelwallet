# White Label Wallet

React starter project for cross-platform wallet generation.

## Technologies

- [React](https://github.com/facebook/react)
- [Electron](https://github.com/electron/electron)
- [Ionic](https://github.com/ionic-team/ionic)
- [Capacitor](https://github.com/ionic-team/capacitor)
- [Npm](https://github.com/npm/npm)([Npx](https://github.com/npm/npx))/[Yarn](https://github.com/yarnpkg/yarn)

## Developing Native Components

When developing native components, make sure to use the wrappers provided by Ionic found on their docs so the components are cross-compatible on web, desktop, and mobile.

## Versioning

We use commitlint and standard-version to automate the CHANGELOG process and making releasing easier.

When making a commit, please follow the following format in order to pass the commit lint: "type(project-ticketNumber): description"
Type can be any of the following: feature, bugfix, test, misc
By following these, commits will automatically generate a nice changelog when a release is done.
There are 3 release commands which you can use, `release:major`, `release:minor`, and `release:path`, which increment the respective versions `x.0.0`, `0.x.0`, and `0.0.x`.

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

## Translations

This starter project is fully equipped to handle translations and support this editor https://bitbucket.org/bflower/react-intl-editor/src/master/.

Directory to import keys from: `src/translations/keys`. (Add new translations here)
Directory to add different locales: `src/translations/locales`.

To use in component:
```
import { injectIntl, intlShape } from 'react-intl';
import { TRANSLATION_KEYS } from 'translations/keys';

const Component = ({ intl: { formatMessage }}) => {
    return (
        <div>
            {formatMessage(TRANSLATION_KEYS.COMMON.SUBMIT)}
        </div>
    );
};

Component.propTypes = {
    intl: intlShape.isRequired,
};

export default injectIntl(Component);
```

To run translations manager: `yarn run manage:translations`.

To run translations editor (Needs node v6):
```
Run translations manager from above command.
Run these next commands from outside this project's folder.
- git clone git@bitbucket.org:bflower/react-intl-editor.git
- cd react-intl-editor
- npm install
- npm run dev
Import files for defaultMessage (src/translations/locales/defaultMessages.json), whichever translation you want to do (src/translations/locales/es.json), and whitelist file corresponding to same locale (src/translations/locales/whitelist_es.json).
```
