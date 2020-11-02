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
