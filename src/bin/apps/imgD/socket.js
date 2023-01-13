const ImgD = require("./imgD");

module.exports = socket => {
	socket.on("imgD-start" , async ({url}) => {
		const sid = socket.id;
		if(global.imgDsessions[sid]) global.imgDsessions[sid].stop();
		const imgD = new ImgD({url, sid});
		imgD.on("imgD-imgs", ({title, num}) => socket.emit("imgD-imgs", {title, num}));
		imgD.on("imgD-err", ({error}) => socket.emit("imgD-err", {error}));
		imgD.on("imgD-done", d => {
			dlog(d)
			socket.emit("imgD-done", d)
		})
		imgD.on("imgD-dl", i => socket.emit("imgD-dl", i));
		imgD.start(url);
	});
}