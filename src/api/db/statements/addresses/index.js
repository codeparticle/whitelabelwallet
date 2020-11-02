/**
* MIT License
*
* Copyright (c) 2020 Code Particle Inc.
* 
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
* 
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
* 
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/
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
    ADDRESS_ID: (addr) => `select id from Addresses where address="${addr}"`,
    ALL: `select * from Addresses`,
    BALANCE_BY_ADDRESS: (addr) => `select balance from Addresses where address="${addr}"`,
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
