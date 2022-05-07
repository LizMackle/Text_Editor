import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB("jate", 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction("jate", "readwrite");

  // Open up the desired object store.
  const store = tx.objectStore("jate");

  // Use the .add() method on the store and pass in the content.
  const request = store.put({ id: 1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// console.error("putDb not implemented");

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log("GET all from the database");

  const jateDB = await openDB("jate", 1);

  const tx = jateDB.transaction("jate", "readonly");

  const store = tx.objectStore("jate");

  const id = 1;

  const getAll = await store.getAll();
  console.log({ getAll });
  console.log("aaaaa");
  const request = store.get(id); /// store.getAll(id);

  // Get confirmation of the request
  const result = await request;

  console.log("result.value", result?.value);
  return result?.value;
};

// console.error("getDb not implemented");

initdb();
