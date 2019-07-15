import localeData from './locales';

export const localesOptions = Object.keys(localeData).map(key => ({
  value: key,
  label: localeData[key].label,
}));

export const localesMapping = Object.keys(localeData).reduce((previous, current) => {
  previous[current] = localeData[current].label;
  return previous;
}, {});
