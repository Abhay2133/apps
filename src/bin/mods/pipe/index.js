const archiver = require("archiver");
const mime = require('mime/lite');

module.exports = async function (req, res) {
	let link =  req.query?.link;
	let zip = req.query?.zip;
	if(!link) return res.render("error", {err_code : "400 : Bad Request", err_mess : "link missing in query !"});

	const fetch = (await import("node-fetch")).default;

	const response = await fetch(link);
	if(!response.ok) return res.render("error", {err_code : "500 : Server Error !", err_mess: `Given link : '${link}' caused server error. Plz report this to us give a screenshot !`})

	let ct = response.headers.get("content-type").split(";")[0];
	let ext = mime.getExtension(ct);
	const name = link.split("/").at(-1).split("?")[0] || "File"+'.'+ext;
	res.setHeader("Content-Disposition", `attachment; filename=${name}${zip?".zip":""}`);
	res.setHeader("Content-Type", ct);
	if(zip){
		const archive = archiver('zip', {
  			zlib: { level: 9 }
		});
		archive.append(response.body, {name});
		res.setHeader("Content-Type", "application/zip")
		archive.pipe(res);
		archive.finalize();
	} else response.body.pipe(res);
}