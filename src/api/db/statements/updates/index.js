export const UPDATES_STATEMENTS = {
  CREATE: `create table Updates (
    app_version float default 0,
    db_version int default 0 not null
  );`,
  INSERT: {
    DEFAULT: `insert into Updates default values;`,
  },
  SELECT: {
    DB_VERSION: `select db_version from Updates order by db_version desc limit 1;`,
  },
};
