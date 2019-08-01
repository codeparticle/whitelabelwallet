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
    foreign key (sender_address_id) references Addresses(id) on delete set null,
    foreign key (receiver_address_id) references Addresses(id) on delete set null
  );`,
  INSERT: {},
  SELECT: {},
};
