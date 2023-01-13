import { $ , dlog } from "./hlpr.js"

async function show(tag, { d, h, p, m }, delay) {
	if (delay) {
		tag.style.transition = delay + "ms";
		await wait(10);
	}
	if (d) tag.style.display = d
	if (h) tag.style.height = h
	if (p) tag.style.padding = p
	if (m) tag.style.margin = m
}

const startImgD = async () => {
	const link = $("#website_url")?.value;

	fetch("/imgD",{
		method : "POST",
		body : JSON.stringify({link}),
		headers : {
			"Content-Type" : "application/json"
		}
	})
	.then(r => r.json())
	.then(handleData)
	//$("#imgD-loading").classList.replace("collapse", "show-loader");
	reset_imgd_ui();
}

function reset_imgd_ui() {
	$("#imgD-ps").classList.remove("collapse")
	$("#imgD-loading").classList.replace("collapse", "show-loader");
	$("#imgD-info").classList.add("collapse");
	//$("#imgD-info").classList.replace("show-dl-cont", "collapse");
	//$("#dl-ps").classList.replace("dl-icon", "spinner-icon");
}

function handleData (data){
	if(data.error) return dlog(data)
		$("#imgD-loading").classList.replace("show-loader","collapse");
		$("#imgD-info").classList.remove("collapse");
		$("#img-title").textContent = data.title;
		$("#img-num").textContent = data.imgs + " images found !";
		$("#imgD-dl").onclick = () => window.location.assign("/imgD/dl?token="+data.token);
}

export function onStart() {
	if (document.title != "Image Downloader") return;
	$("#siteURL_form").addEventListener("submit", e => {
		e.preventDefault();
		startImgD();
	})
}

onStart();
