/**
 * @fileoverview Mock update
 * @author Gabriel Womble
 */

const updateString = `
  begin transaction;
  create table Test (
    id integer primary key
  );
  drop table Test;
  commit;
`;

const update = {
  try: updateString,
  catch: '',
};

export default update;