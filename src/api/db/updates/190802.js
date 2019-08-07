/**
 * @fileoverview Mock update
 * @author Gabriel Womble
 */

const update = `
  begin transaction;
  create table Test (
    id integer primary key
  );
  drop table Test;
  commit;
`;

export default update;