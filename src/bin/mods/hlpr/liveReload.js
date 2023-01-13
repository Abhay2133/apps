const fs = require("fs");

function watcher(dirs, cb) {
	for (let dir of dirs) {
		fs.watch(dir, cb);
		let files = fs.readdirSync(dir);
		for (let file of files) {
			file = j(dir, file);
			let stat = fs.statSync(file);
			if (stat.isDirectory()) watcher([file], cb);
		}
	}
}

module.exports = function () {
	let dir2W = [j(sdir, "views"), pdir];
	global.reloadClients = {};
	watcher(dir2W, (e, f) => {
		log(e, f);
		global.emitReload();
		//for(let client in global.reloadClients) global.reloadClients[client] = true;
	});
}