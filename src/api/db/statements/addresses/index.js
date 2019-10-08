export const ADDRESSES_STATEMENTS = {
  CREATE: `create table Addresses (
    id integer primary key,
    wallet_id integer references Wallets(id),
    address varchar(100),
    private_key varchar(100),
    name nvarchar(200) default 'Address',
    create_date datetime default current_timestamp,
    last_modified_date datetime default current_timestamp,
    is_active tinyint default 1,
    balance decimal(16,8),
    parent_id integer,
    foreign key (wallet_id) references Wallets(id) on delete cascade
  );`,
  INSERT: {
    NEW: `insert into Addresses(id, wallet_id, address, private_key, name, is_active, balance, parent_id)
    values(?,?,?,?,?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Addresses`,
    BY_WALLET_ID: (id) => `select * from Addresses where wallet_id=${id}`,
    PRIV_KEY_BY_ADDR: (addr) => `select private_key from Addresses where address="${addr}"`,
    FORMATTED_ADDRESS_NAME: (addr) => `
      select Wallets.name as wallet_name, Addresses.name as address_name
      from Wallets
      inner join Addresses
      on Wallets.id = Addresses.wallet_id
      where Addresses.address="${addr}"
    `,
  },
};
