const fs = require("node:fs");
const logger = require("./logger");
const liveReload = require("./liveReload")
const css = require("./css");

const	out = (file) => {
	let dir = file.split("/");
	dir.pop();
	dir = dir.join("/");
	fs.mkdirSync(dir, { recursive: true });
	return fs.createWriteStream(file);
};

function ext(a, s = "/") {
	return a.split(s).at(-1).split("?")[0].split(".").at(-1);
}

module.exports = {
	logger,
	ext,
	liveReload,
	css,
	out
};
