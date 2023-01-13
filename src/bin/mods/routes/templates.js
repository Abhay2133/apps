const fs = require("fs");
var srcs = [];
try{srcs = fs.readdirSync(j(pdir, "gallery")).map(f => "/gallery/"+f);} catch(e){dlog({e})}

let data = {
	"/": { view: "index", title: "Node Pro", mainHeading: "Node Pro" },
	"/index": { isDev : !isPro , view: "index", title: "Node Pro", mainHeading: "Node Pro" },
	"/?": { view: "index", title: "Node Pro", mainHeading: "Node Pro" },
	"/imgD": { view: "imgD", title: "Image Downloader", mainHeading: "Image Downloader" },
	"/ytdl": {
		view: "ytdl",
		title: "YouTube Video Downloader",
		mainHeading: "Node Pro",
	},
	"/wu": { view: "wu", title: "WhatsUp", mainHeading: "WhatsUp" },
	"/signup": { view: "signup", title: "SignUp", mainHeading: "SignUp" },
	"/login": { view: "login", title: "LOGIN", mainHeading: "Login" },
	"/fd": {
		view: "fd",
		title: "File Downloader",
		mainHeading: "File Downloader",
	},
	"/gallery" : { view : "gallery", title : "Gallery", mainHeading : "Gallery" , srcs},
};

if (!isPro) {
}

module.exports = data;
