importScripts("/socket.io/socket.io.js")

const socket = io();
socket.on("reload", () => {
	//console.log("reload event fired");
	postMessage(true)
});