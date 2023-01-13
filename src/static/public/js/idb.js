
const idb = indexedDB.open("idb", __appV + 1);
const store_name = "cache";
idb.onupgradeneeded = (e) => {
	let db = idb.result;
	if ( ! db.objectStoreNames.contains(store_name))
		db.createObjectStore(store_name, { keyPath : 'id'})
}

idb.onerror = () => {
	
}

idb.onsuccess = () => {
	let db = idb.result;
	db.onversionchange = () => db.close();
	
	const trans = db.transaction(store_name, "readwrite");
	const store = trans.objectStore(store_name);
	
	let data = {
		id : "js",
		content : "alert('Yo Bro Abhay !')",
		created : Date.now()
	}
	const req = store.put(data);
	
	req.onerror = () => console.log({ req_err : req.error})
	req.onsuccess = () => {
		let js = store.get("js");
		js.onsuccess = (e) => {
			console.log(e.target.result);
		}
	}
}
