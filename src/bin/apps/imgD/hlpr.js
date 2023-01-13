const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const {exec} = require("child_process");

function imgFilter ( img ,url,  n ) {
	let src = img.getAttribute("src") || false;
	//dlog({src, url});
	if ( ! src ) return false;
	
	if(! src.includes("http")) {
		if ( url.at(-1) == "/") url = url.slice(0,-1);
		let host = url.split("/").slice(0,-1).join("/");
		src = src[0] == "/" ? host+src : host+"/"+src;
	}
	else src = src.slice(src.indexOf("http"));
	let name= `${n}. ${ img.getAttribute("alt") || src.split("/").at(-1).split("?")[0].slice(0, 30)}`;
	let ext = ge(src);
	let exts = ["jpg", "jpeg", "webp", "png", "gif", "ico"]
	ext = exts.includes(ext) ? ext : "jpg";
	if (!exts.includes(ge(name))) name += "."+ ext;
	//dlog({src, ext, name, alt : img.getAttribute("alt")});
	return {src, name};
}

const getTE = (n =3) => (performance.now()/1000).toFixed(3);

const validURL = url => {
	if (!url || !url.startsWith("http")) return false;
	return true;
}

// function _get (signal, url, dest = false) {
// 	return new Promise( (res, rej) => {
// 		var body = "";
// 		const cb = h => 
// 			h.get(url, {signal}, r => {
// 				if(dest) {
// 					if(!fs.existsSync(dest)) {
// 						let dir = dest.split("/").slice(0,-1).join("/");
// 						fs.mkdirSync(dir, { recursive : true });
// 					}
// 					r.pipe(fs.createWriteStream(dest));
// 				}
// 				r.on("data", c =>{body+=c});
// 				r.on('end', () => res(body));
// 			});
		
// 		let cr;
// 		if(!url.startsWith("http")) return res(body);
// 		if(url.startsWith("https")) cr = cb(https);
// 		else cr = cb(http);
// 		cr.on("error", error =>{dlog({error, url}); res({error})});
// 	});
// }


function _get ({signal, url, dest = false}){
	return new Promise (async resolve => {
		var cmd = `curl '${url}'`
		if (dest) {
			const dir = dest.split("/").slice(0,-1).join("/");
			if(!fs.existsSync(dir)) await new Promise(a => fs.mkdir(dir, {recursive: true}, () => a() ) );
			cmd += ` > '${dest}'`;
		}
		dlog({cmd})
		exec(cmd, (error, sout, serr) => {
			if(error) {dlog({error, cmd}); return resolve({error})};
			resolve(sout);
		})
	})
}


const ge = a => a.split(".").at(-1);
module.exports = { imgFilter , getTE , validURL, _get };