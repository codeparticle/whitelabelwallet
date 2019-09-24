import { wordlists as bip39words } from 'bip39';

// Renamed keys to match locale codes that can be returned from db
const wordlists = {
  en: bip39words.english,
  es: bip39words.spanish,
  fr: bip39words.french,
  it: bip39words.italian,
  ko: bip39words.korean,
  ja: bip39words.japanese,
  zh_HANS: bip39words.chinese_simplified,
  zh_HANT: bip39words.chinese_traditional,
};

export { wordlists };
