export const WALLETS_STATEMENTS = {
  CREATE: `create table Wallets (
    id integer primary key,
    coin_id integer references Coins(id),
    name nvarchar(200) not null,
    require_password tinyint not null,
    password_hash varchar(100) not null,
    seed varchar(100) not null,
    multi_address tinyint not null,
    description blob default '',
    address_index integer
  );`,
  INSERT: {
    NEW: `insert into Wallets(id, name, coin_id, multi_address, require_password, password_hash, seed, address_index)
    values(?,?,?,?,?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Wallets`,
    ID: (id) => `select * from Wallets where id = ${id}`,
    NAME: `select id, name from Wallets`,
    NAME_BY_ADDRESS: (addr) => `
      select Wallets.name as name from Wallets
      inner join Addresses
      on Wallets.id = Addresses.wallet_id
      where Addresses.address="${addr}"
    `,
    WALLET_ADDRESSES_BY_VALUE: (value) => `
        select Wallets.id, Wallets.name as wallet_name,
        Addresses.id as address_id, Addresses.name as address_name, Addresses.address, Addresses.balance
        from Wallets
        inner join Addresses
        on Wallets.id = Addresses.wallet_id
        where Wallets.name like "${value}%" or Addresses.name like "${value}%"
        or Addresses.balance like "${value}%" or Addresses.address like "${value}%"
      `,
  },
};
