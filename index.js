const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts().then(console.table);
      break;

    case "get":
      getContactById(id).then(console.log);
      break;

    case "add":
      addContact(name, email, phone).then(console.log);
      break;

    case "remove":
      removeContact(id).then(() => console.log("removed record with id " + id));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// (async () => {
//   console.log("listContacts", await listContacts());
//   console.log("getContactById", await getContactById("2"));
//   await removeContact("4");
//   console.log("removeContact", await listContacts());
//   console.log(
//     "addContact",
//     await addContact("Wylie Pope", "est@utquamvel.net", "(692) 802-2949")
//   );
// })();
