const { _get } = require("../../mods/hlpr");
const ff = require("./ff");
const { existsSync: es, rmSync: rm, mkdirSync: ms } = require("fs");

const emitError = (s, e) => s.emit("error", { error: e });
const pn = url => {
	let name = url.split("/").at(-1).split("?").at(0)
	if(name.length < 1) name = url.split('/').at(-2);
	return name
}

module.exports = function(socket) {

	socket.on("download", async ({ url, mode = 'file' }) => {
		var size = 0
		const ondata = (chunk, length) => {
			chunk = chunk.length;
			size += chunk;
			const progress = Math.round((size / length).toFixed(2) * 100) + "%";
			//process.stdout.write("\r progress : " + progress);
			socket.emit("fd_progress", { progress });
			dlog({progress})
		}

		if (!url) return emitError(socket, "url is not defined");
		const filename = pn(url);
		const dir = j(sdir, "files", "fd");
		const dest = j(dir, filename);

		// dlog({filename, dest, dir})
		if (!es(dir)) ms(dir, { recursive: true });
		if (es(dest)) rm(dest, { recursive: true });
		let error;
		if (mode == 'file') error = await _get({ url, dest, ondata })
		if (mode == 'ff') error = await ff(url, dest);

		dlog({error})
		if(error) return socket.emit("fd-error", "Link Expired !");
		socket.emit("fd_done", { link: filename });
	});
}