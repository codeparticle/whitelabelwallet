export const CONTACTS_STATEMENTS = {
  CREATE: `create table Contacts (
    id integer primary key,
    name nvarchar(200) not null,
    description nvarchar(500),
    address nvarchar(200)
  );`,
  INSERT: {
    NEW: `insert into Contacts(id, name, address, description)
          values(?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Contacts`,
    VALUE: (value) => `select * from Contacts where name like "${value}%" or address like "${value}%"`,
  },
};
