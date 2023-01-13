// const c_name = "cache-v1";
// isDev = true | false;
const runtime = [
	"/fm",
	"/imgD",
	"wu"
];
const precache = [
	"/index",
	"/css",
	"/favicon.png",
	"/favicon.ico",
];
const allCaches = [...runtime, ...precache]
self.addEventListener("install", e => {
	e.waitUntil(
		caches.open(c_name)
		.then(c => c.addAll(precache))
		.then(() => self.skipWaiting())
	)
})

self.addEventListener("activate", e => {
	self.clients.claim();
});

self.addEventListener("fetch", e => {
	if(isDev) return;
	const { pathname } = new URL(e.request.url)
	const valid = isValid(pathname);

	//console.log("'%s' : '%s'", valid, pathname)
	if (!valid) return;

	return e.respondWith(getRes(e))
})

async function getRes (e){
	const cr = await caches.match(e.request); // cached response
	if (cr) return cr;

	const res = await fetch(e.request.url);
	const clone = await res.clone();
	const cache = await caches.open(c_name);
	await cache.put(e.request, clone);
	return res;
}

function isValid(url) {
	if (allCaches.includes(url)) return true;
	if (url.match(/^(\/js|\/icons)/g)) return true;
	return false;
}