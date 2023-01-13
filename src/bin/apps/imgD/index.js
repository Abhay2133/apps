const {parse} = require("node-html-parser");
const {imgFilter} = require("./hlpr");
const archiver = require("archiver");

const err = (error, res) => {
	elog({error})
	res && res.json({error})
}

const filterRes = (link) => {
	let session = imgDsessions[link]
	let {title, imgs, token} = session;
	return {title, imgs : imgs.length, token}
}

async function imgD (req,res){
	const {link = false} = req.body;
	var {imgD_token = false} = req.cookies;
	let error = false

	if(imgDsessions.hasOwnProperty(link))
		return res.json(filterRes(link));

	if(!link) return err("'link' not defined in req.body !", res);

	var fetch = (await import("node-fetch")).default;
	try{
		var html = await (await fetch(link)).text();
	}catch(e){error = e;}
	if(error) return err(error, res);
	const dom = await parse(html);
	var imgs = (dom.querySelectorAll("img") || []).map((img, i) => imgFilter(img, link, i));
	const title = dom.querySelector("title").textContent;
	
	let token = (performance.now()+"").split(".").join("");
	imgDsessions[link] = {title, imgs, token};

	res.cookie("imgD_token", token, {maxAge : 6000})
	//dlog(imgDsessions);
	return res.json({title, imgs : imgs.length, token});
}

async function dl (req, res) {
	let token = req?.query?.token || req.cookies?.imgD_token;
	if(!token) return res.status(400).render("error",{err_code:"token_missing", err_mess: "ImgD-session token is missing in request query and cookies ! "})

	let session = getSession(token);
	if(!session) return res.status(500).render("error",{err_code:"invalid_token", err_mess: `No ImgD session is registred for this token ('${token}') ! <br/>May be the session is Expired !`});

	const fetch = (await import("node-fetch")).default;
	const archive = archiver('zip', {
  		zlib: { level: 9 }
	});
	res.header("Content-Type", "application/zip")
	res.header("Content-Disposition", "attachment; filename="+session.title+".zip")
	res.on("finish", () =>{delete imgDsessions[token]});
	archive.pipe(res);
	for(let img of session.imgs){
		let {src,name} = img;
		let response = await fetch(src)
		if(!response.ok) continue;
		await pipe(archive, response.body, name);
	}
	archive.finalize()
}

function getSession (id){ // id = link || token
	if(imgDsessions.hasOwnProperty(id)) return imgDsessions[id];
	for(let session in imgDsessions){
		if(imgDsessions[session].token == id) return imgDsessions[session]
	}
	return false;
}

const pipe = (archive, body, name) => new Promise(resolve => {
	archive.append(body,{name})
	body.on("end", resolve);
})

module.exports = {
	imgD,
	dl,
	getSession
}

/*
curl -H 'Content-Type: application/json' -X POST http://localhost:3000 -d '{"link" : "https://ww1.onepunch.online/manga/one-punch-man-chapter-177/"}' 
*/