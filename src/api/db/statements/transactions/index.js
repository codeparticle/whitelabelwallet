export const TRANSACTIONS_STATEMENTS = {
  CREATE: `create table Transactions (
    id integer primary key,
    sender_address_id integer,
    receiver_address_id integer,
    amount decimal(16,8),
    fee decimal(16,8),
    transaction_id varchar(200),
    description varchar(100),
    sender_address varchar(100),
    receiver_address varchar(100),
    status tinyint not null,
    created_date datetime,
    transaction_type varchar(100),
    pending_balance decimal(16,8),
    foreign key (sender_address_id) references Addresses(id) on delete set null,
    foreign key (receiver_address_id) references Addresses(id) on delete set null
  );`,
  INSERT: {
    NEW: `insert into Transactions(id, sender_address_id, receiver_address_id, amount, fee, transaction_id, description, sender_address, receiver_address, status, created_date, transaction_type, pending_balance)
    values(?,?,?,?,?,?,?,?,?,?,?,?,?)`,
  },
  SELECT: {
    ALL: `select * from Transactions order by created_date desc`,
    AFTER_DATE: (dateTime) => `select * from Transactions where created_date >= "${dateTime}" order by created_date desc`,
    PER_ADDRESS: (address, dateTime) => `select * from Transactions where (sender_address = "${address}" or receiver_address = "${address}") and created_date >= "${dateTime}" order by created_date desc`,
    VALUE: (address, value, dateTime) => `
      select Transactions.*, Addresses.name from Transactions
      left join Addresses on (receiver_address = Addresses.address
      or sender_address = Addresses.address)
      where (description like "%${value}%" or amount like "%${value}%"
      or Transactions.created_date like "%${value}%" or name like "%${value}%") and (sender_address = "${address}"
      or receiver_address = "${address}") and Transactions.created_date >= "${dateTime}" order by created_date desc`,
    INCLUDE_WALLETS_SEARCH_BY_VALUE: (address, value, dateTime) => `
      select Transactions.*, Addresses.wallet_id, Wallets.name from Transactions
      inner join Addresses on (receiver_address = Addresses.address
      or sender_address = Addresses.address)
      left join Wallets on Addresses.wallet_id = Wallets.id
      where (Transactions.description like "%${value}%" or amount like "%${value}%"
      or Transactions.created_date like "%${value}%" or Wallets.name like "%${value}%") and (sender_address = "${address}"
      or receiver_address = "${address}") and Transactions.created_date >= "${dateTime}" order by created_date desc`,
    TX_DETAILS: (txId, type) => (`
      select * from Transactions where transaction_id="${txId}" and transaction_type="${type}"`),
  },
};
