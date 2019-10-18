export const CONTACTS_STATEMENTS = {
  CREATE: `create table Contacts (
    id integer primary key,
    name nvarchar(200) not null,
    description blob default '',
    address nvarchar(200)
  );`,
  INSERT: {
    NEW: `insert into Contacts(id, name, address, description)
          values(?,?,?,?)`,
  },
  SELECT: {
    ADDRESS_ID: (addr) => `select id from Contacts where address="${addr}"`,
    ALL: `select * from Contacts`,
    FORMATTED_CONTACT_NAME: (addr) => `select name from Contacts where address="${addr}"`,
    VALUE: (value) => `select * from Contacts where name like "${value}%" or address like "${value}%"`,
  },
};
