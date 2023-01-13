import { $ , dlog } from "./hlpr.js"

export const onStart = ()=>{
	if (document.title != "File Downloader") return;
	$(".fd-form").removeEventListener("submit", pipe);
	$(".fd-form").addEventListener("submit", pipe);
}

function pipe (e) {
	e.preventDefault();
	return window.open(`/pipe?link=${$(".fd-url").value}&zip=${$("#zip").checked}`);
}

onStart();