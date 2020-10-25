// window.onbeforeunload = function() {
//     return "Data will be lost if you leave the page, are you sure?";
// };

// window.addEventListener('beforeunload', function (e) {
//     console.log(e)
//     // Cancel the event
//     e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
//     // Chrome requires returnValue to be set
//     e.returnValue = 'Data will be lost if you leave the page, are you sure?';
//   });


// In the following line, you should include the prefixes of implementations you want to test.
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
// DON'T use "var indexedDB = ..." if you're not in a function.
// Moreover, you may need references to some window.IDB* objects:
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {READ_WRITE: "readwrite"}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
// (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

if (!window.indexedDB) {
    alert("Your browser doesn't support a stable version of IndexedDB. Please use a current or updated your browser.");
    location.replace(`${window.location.origin}`)
}

if(window.indexedDB){

    var request = window.indexedDB.open('@_SOROSOKE_PERSIST_CHAT', 1);

    var db;

    request.onsuccess = function(event) {
        console.log('[onsuccess]', request.result);
        db = event.target.result; // === request.result
        
    };

    request.onerror = function(event) {
        console.log('[onerror]', request.error);
    };


}