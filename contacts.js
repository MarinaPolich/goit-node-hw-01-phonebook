const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve("db/contacts.json");

async function writeContacts(list) {
  try {
    await fs.writeFile(contactsPath, JSON.stringify(list), "utf8");
  } catch (err) {
    console.log(err);
  }
}

// TODO: задокументувати кожну функцію
async function listContacts() {
  try {
    const list = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(list);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  const list = await listContacts();
  return list.find((x) => x.id === contactId);
}

async function removeContact(contactId) {
  const list = await listContacts();
  await writeContacts(list.filter((x) => x.id !== contactId));
}

async function addContact(name, email, phone) {
  const list = await listContacts();
  const id = (+list[list.length - 1].id + 1).toString();
  await writeContacts([...list, { id, name, email, phone }]);
  return { id, name, email, phone };
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
