
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



// const saveRecord = (record) => {
//     const transaction = db.transaction(["pending"], "readwrite");
//     const store = transaction.objectStore("pending");
//     store.add(record);
// }

// const checkDatabase = () => {
//     const transaction = db.transaction(["pending"], "readwrite");
//     const store = transaction.objectStore("pending");
//     const getAll = store.getAll();

//     getAll.onsuccess = () => {
//         if (getAll.result.length > 0) {
//             fetch("/api/transaction/bulk", {
//                 method: "POST",
//                 body: JSON.stringify(getAll.result),
//                 header: {
//                     Accept: "application/json, text/plain, */*",
//                     "Content-Type": "application/json"
//                 }
//             }).then(response => response.json).then(() => {
//                 // delete record if succesful
//                 const transaction = db.transaction(["pending"], "readwrite");
//                 const store = transaction.objectStore("pending");
//                 store.clear();
//             });
//         }
//     };
// }

// const deletePending = () => {
//     const transaction = db.transaction(["pending"], "readwrite");
//     const store = transaction.objectStore("pending");
//     store.clear();
// }

// // added so that the app knows to listen for connecting online 
// window.addEventListener("online", checkDatabase);