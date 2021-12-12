const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const { customAlphabet } = require("nanoid");
const newId = customAlphabet("1234567890", 10);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);

    const list = JSON.parse(data);

    return console.table(list);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const contact = contacts.filter(
      (contact) => contact.id === Number(contactId)
    );

    return console.table(contact);
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);

    const filteredContacts = contacts.filter(
      (contact) => contact.id != contactId
    );

    await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2));

    console.table(filteredContacts);
    console.log("\x1b[32m Successfully deleted");
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  const newContact = {
    id: Number(newId()),
    name,
    email,
    phone,
  };

  try {
    const data = await fs.readFile(contactsPath);
    const parsedContacts = JSON.parse(data);

    const contacts = [...parsedContacts, newContact];

    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    console.table(contacts);
    console.log("\x1b[32m Successfully added");
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
