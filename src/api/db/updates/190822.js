/**
 * @fileoverview Mock contacts update
 * @author Gabriel Womble
 */

const update = `
  begin transaction;
  insert into Contacts(id, name, description, address)
  values(1, 'Michael', 'Best boss ever.', 'asdkjv9zx8u9qulk2sdlafjz09'),
  (2, 'Dwight', 'Assistant to the regional manager', 'asdkjv9zx8u9qulk2sdlafjz29'),
  (3, 'Jim', 'Salesman', 'asdkjv9zx8u9qulk2sdldfjz42');
  commit;
`;

export default update;