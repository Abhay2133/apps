const fs = require("fs");
const css_dir = j(pdir, "css");
const tree = {};

module.exports = (req, res) => {
	readDir(css_dir)
		.then(css => {
			css = css.replace(/[\n\r\t]/g,"")
			res.setHeader("Content-Type", "text/css");
			res.setHeader("Content-Length", css.length);
			// log({css})
			res.end(css);
		})
}

function readDir(dir) {
	return new Promise(res => {
		var css = "";
		fs.readdir(dir, async (e, ls) => {
			if (e) return console.log({e}, !!res(css))

			for (let i of ls) {
				const ip = j(dir, i);
				const isdir = await isDir(ip);
				// log({isdir, ip})
				let txt = await (isdir ? readDir(ip) :readFile(ip));
				// log({txt})
				css += txt;
				// log({css})
			}
			return res(css)
		})
	})
}

function readFile(file) {
	return new Promise(a => {
		fs.readFile(file, (e, t) => (e ? log({readErr : e}, a("")) :  a(t.toString())));
	})
}

const isDir = (dir) => new Promise(a => {
	fs.stat(dir, (e, stat) => {
		if(e) return log({isDir_err : e}, a(false));
		a(stat.isDirectory());
	});
})