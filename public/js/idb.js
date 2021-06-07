const { get } = require("../../routes/api");

let db;
// create new request for db // database name budget //
const request = indexedDB.open("budget", 1);


request.onupgradeneeded = ({ target }) => {
    // object store called pending // will autoincrement //
    let db = target.results;
    db.createObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = (event) => {
    db = event.target.result;
    // check app for online status // this is done before database is read //
    if (navigator.onLine) {
        checkDatabase();
    }
};

request.onerror = (event) => {
    console.log(event.target.errorCode);
};

saveRecord = (record) => {
    const transaction = db.transaction(["pending"], "readwrite"); // transaction created with pending database with read/write access //
    const store = transaction.objectStore("pending"); // access the pending object store //
    store.add(record) // add method used to add record //
}

checkDatabase = () => {
    const transaction = db.transaction(["pending"], "readwrite"); // opens a transaction on pending database //
    const store = transaction.objectStore("pending") // access the pending object store //
    const getAll = store.getAll(); // get store records // set a variable //
    getAll.onsuccess = () => {
        if (getAll.result.length > 0) {
            fetch("api/transaction/bulk", {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: "application/json text/plain, */*",
                    "Content-Type": "application/json"
                }
            }).then(response => response.json()).then(() => {
                const transaction = db.transaction(["pending"], "readwrite"); // on success open transaction //
                const store = transaction.objectStore("pending"); // access to pending store //
                store.clear(); // clear all items //
            });
        }
    };
}

// event listener for when app is back online //
window.addEventListener("online", checkDatabase);