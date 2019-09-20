export const ADDRESSES_STATEMENTS = {
  CREATE: `create table Addresses (
    id integer primary key,
    wallet_id integer references Wallets(id),
    address varchar(100),
    name nvarchar(200) default 'Address',
    create_date datetime default current_timestamp,
    last_modified_date datetime default current_timestamp,,
    is_active tinyint default 1,
    balance decimal(16,8),
    parent_id integer,
    foreign key (wallet_id) references Wallets(id) on delete cascade
  );`,
  INSERT: {
    NEW: `insert into Addresses(id, wallet_id, address, name, is_active, balance, parent_id)
    values(?,?,?,?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Addresses`,
    BY_WALLET_ID: (id) => `select * from Addresses where wallet_id=${id}`,
  },
};
