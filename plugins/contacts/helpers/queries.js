/**
 * @fileoverview DB related functions used in the Contacts Plugin
 * @author Gabriel Womble
 */

/**
 * Function to search a contact by name or address
 * @param {Object} manager - the manager object
 * @param {func} setFn - the function that sets the query response to state
 * @param {func} value - the value to query
 */
async function searchContactsByValue(manager, setFn, value) {
  const res = await manager.databaseManager.getContactsByValue(value);
  setFn(res);
}

/**
 * Function that gets all Contacts from DB, and then sets the response
 * to the redux store
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 */
async function fetchContacts(manager, setFn) {
  const res = await manager.databaseManager.getContacts();
  setFn(res);
}

/**
 * Function that adds a new contact to the db, and then sets the updated contact table to state
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 * @param {Object} contact - the contact object to add to the db
 */
async function createContactAndUpdateList(manager, setFn, contact) {
  await manager.databaseManager.insert().contact(contact);
  await manager.saveDatabase();

  await fetchContacts(manager, setFn);
}

/**
 * Function that updates an existing contact in the db, and then sets the updated contact table to state
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 * @param {Object} contact - the contact object to update
 */
async function updateContactAndUpdateList(manager, setFn, contact) {
  await manager.databaseManager.updateContactById(contact.id, contact);
  await manager.saveDatabase();

  await fetchContacts(manager, setFn);
}

/**
 * Function that deletes an existing contact, and then sets the updated contact table to state
 * @param {Object} manager - the manager object
 * @param {func} setFn - function that sets the response to state
 * @param {number} contactId - the id of the contact to delete
 */
async function deleteContactAndUpdateList(manager, setFn, contactId) {
  await manager.databaseManager.deleteContactById(contactId);
  await manager.saveDatabase();

  await fetchContacts(manager, setFn);
}

export {
  createContactAndUpdateList,
  deleteContactAndUpdateList,
  fetchContacts,
  searchContactsByValue,
  updateContactAndUpdateList,
};
