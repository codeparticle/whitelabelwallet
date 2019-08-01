export const WALLETS_STATEMENTS = {
  CREATE: `create table Wallets (
    id integer primary key,
    coin_id integer references Coins(id),
    name nvarchar(200) not null,
    require_password tinyint not null,
    password_hash varchar(100) not null,
    seed varchar(100) not null
  );`,
  INSERT: {},
  SELECT: {},
};
