const fs = require("node:fs");
module.exports = (req, res ) => {
	let { uid } = req.query;
	if ( ! uid ) return res.end("Error : uid missing is query");
	let zip = j(sdir, "files", "imgD", uid, uid+".zip");
	if (!fs.existsSync(zip)) return res.end();
	res.download(zip);
}