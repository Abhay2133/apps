const colors = require("colors");
module.exports  = (req, res, next) => {
	if (req.url == "/reload") return; //log({reload})
	let st = performance.now();
	let mc = {
		GET: "green",
		POST: "yellow",
		PUT: "blue",
		DELETE: "red",
	};
	let clr = mc[req.method] || "grey";
	let method = colors[clr](req.method);
	
	res.on("finish", () => {
		let ms = 10;
		let time = (performance.now() - st).toFixed(1) + "ms";

		let sp = ms - time.length;
		sp = sp >= 0 ? sp : 0;

		//let method = res.statusCode >= 400 ? colors.bgRed(clr) : clr;
		let sc = res.statusCode;
		let ssc = colors.bgBlack(colors.green(sc));
		if(sc > 300 && sc < 400) ssc = colors.bgYellow(colors.black(sc));
		//if(sc > 400 && sc < 500) ssc = colors.bgBlue(colors.red(sc));
		if(sc > 400) ssc = colors.bgRed(colors.white(sc));

		log("%s  %s %s %s %s %s",
			ssc,
			method,
			" ".repeat(6-req.method.length),
			colors.yellow(time),
			" ".repeat(sp),
			req.url
		);
	});
	next();
};