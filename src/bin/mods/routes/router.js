const fs = require("node:fs")
const colors = require("colors")
const urlm = require("url")
const router = require("express").Router()
let ts = require("./templates");
const hbs = require("handlebars");
const {imgD,dl} = require("../../apps/imgD");
const pipe = require("../pipe");
const { css } = require("../hlpr/index");

router.get("/css", css);

router.get("/isLive", (req, res) => res.end("1"));
router.get("/", (req, res) => res.redirect("/index"));
for (let url in ts) 
	router.get(url, (req, res) => res.render(ts[url].view, ts[url]));

router.post("/imgD", imgD)
router.get("/imgD/dl", dl);
router.post("/imgD-token", (req, res) => {
	let {token} = req.body;
	if(imgDsessions.hasOwnProperty(token)) return res.json(imgDsessions[token]);
	return res.json({error : "404 ! TOKEN NOT FOUND"})
})

router.post("/ytdl/getd", require("../../apps/ytdl/main.js").getD);
router.get("/ytdl/download", require("../../apps/ytdl/main.js").dl);

router.use("/fd/download", require("../../apps/fd"));
router.get("/pipe", pipe)

router.get("/sw", (req, res) => {
	fs.readFile(j(pdir, "sw.js"), (e, d) => {
		if(e) return dlog({e}, !!res.end());
		const sw = `const c_name = "cache-v${__appV}";
		\nconst isDev = ${process.env?.NODE_ENV?.toLowerCase().trim() !== "production"};
		\n${d.toString()}`;
		res.setHeader("Content-Length", sw.length);
		res.setHeader("Content-Type", "application/javascript");
		res.end(sw)
	})
})


router.get("/505", (req, res) => res.status(505).end());
router.post("/kill", (req,res)=> {
	let code = req.body?.code;
	let delay = req.body?.delay || 0;
	let killed = code === process.env.np_kill_code;
	if(killed) res.on("finish", ()=> {
		log(require("colors").red("Server is Dead !"));
		process.exit();
	})
	// else dlog("Wrong code : %s != %s", )
	return res.json({killed});
})

router.use((req, res ) => {
	res.status(404)
	const data = {
		err_code : 404,
		err_mess: "PAGE NOT FOUND !",
		title : "PAGE NOT FOUND !",
		mainHeading : 404
	}
	res.render("error", data);
});

module.exports = router;