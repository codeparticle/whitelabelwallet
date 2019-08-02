/**
 * @fileoverview Mock update, uses instance to make a query
 * @author Gabriel Womble
 */

export default async (instance) => {
  console.log(await instance.getUpdatesTable());

  return true;
};
