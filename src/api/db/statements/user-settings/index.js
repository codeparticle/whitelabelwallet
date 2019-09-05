export const USER_SETTINGS_STATEMENTS = {
  CREATE: `create table UserSettings (
    locale char default 'en' not null,
    fiat char default 'usd' not null,
    theme char default 'light' not null
  );`,
  INSERT: {
    DEFAULT: `insert into UserSettings default values;`,
  },
  SELECT: {
    ALL: `select * from UserSettings limit 1;`,
  },
};
