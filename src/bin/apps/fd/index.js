const fs = require("fs");
const isFile = (f) => {
	if ( fs.existsSync(f)) {
		return fs.statSync(f).isFile();
	}
	return false;
}

module.exports = async function (req, res, next) {
	const file = j(sdir, "files", "fd", req.query.file || "");
	if ( isFile(file)) return res.download(file);
	res.status(404).end();
}