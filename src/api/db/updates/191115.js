/**
 * @fileoverview wallet update.
 * @author Marc Mathieu
 */

const update = {
  try: `ALTER TABLE Wallets ADD COLUMN address_index integer default 0`,
  catch: '',
};

export default update;