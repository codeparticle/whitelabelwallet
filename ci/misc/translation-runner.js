'use strict';

const manageTranslations = require('react-intl-translations-manager').default;
const readFile = require('react-intl-translations-manager/dist/readFile').default;
const DEFAULT_LANG = 'en';

manageTranslations({
  messagesDirectory: 'src/translations/messages',
  translationsDirectory: 'src/translations/locales',
  languages: [DEFAULT_LANG, 'es'],
  singleMessagesFile: true,
  overrideCoreMethods: {
    provideWhitelistFile: ({
      lang,
      languageFilepath,
      whitelistFilepath,
    }) => {
      let jsonFile;
      let whitelist;

      if (lang === DEFAULT_LANG) {
        jsonFile = readFile(languageFilepath);
        whitelist = jsonFile ? Object.keys(JSON.parse(jsonFile)) : undefined;
      } else {
        jsonFile = readFile(whitelistFilepath);
        whitelist = jsonFile ? JSON.parse(jsonFile) : undefined;
      }

      return whitelist || undefined;
    },
  },
});
