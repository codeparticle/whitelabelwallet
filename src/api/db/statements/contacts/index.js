export const CONTACTS_STATEMENTS = {
  CREATE: `create table Contacts (
    id integer primary key,
    name nvarchar(200) not null,
    description nvarchar(500),
    address nvarchar(200)
  );`,
  INSERT: {},
  SELECT: {},
};
