export const WALLETS_STATEMENTS = {
  CREATE: `create table Wallets (
    id integer primary key,
    coin_id integer references Coins(id),
    name nvarchar(200) not null,
    require_password tinyint not null,
    password_hash varchar(100) not null,
    seed varchar(100) not null,
    multi_address tinyint not null,
    description nvarchar(500)
  );`,
  INSERT: {
    NEW: `insert into Wallets(id, name, coin_id, multi_address, require_password, password_hash, seed)
    values(?,?,?,?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Wallets`,
    ID: (id) => `select * from Wallets where id = ${id}`,
  },
};
