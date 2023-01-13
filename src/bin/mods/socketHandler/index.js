const { liveReload } = require("../hlpr");
//const { genHash } = require("../captcha/hlpr");

module.exports = async function (io) {
	io.on("connection", (socket) => {
		const url = socket.handshake.headers.referer;
		const view = url.split("/")[3].toLowerCase();
		const route = url.split("/").slice(3).join("/");

		if (!isPro) {
			if (route != "js/liveReload.js") log("new socket added from", socket.handshake.address);
			if (!newReloaded){
				global.newReloaded = true;
				emitReload();
			}
		}
		switch(view) {
			case "fd" :
				require("../../apps/fd/socket")(socket);
				break;
			case "imgd" :
				require("../../apps/imgD/socket")(socket);
				break;
		}

		socket.on("disconnect",()=> route != "js/liveReload.js" && dlog("socket disconnected :", `'${socket.handshake.address}'`));
	});

};
