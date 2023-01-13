export const $ = q => document.querySelector(q);
export const $$ = q => document.querySelectorAll(q);

export const hide = (tag) => (tag.style.display = "none");
export const wait = (n = 0) => new Promise((a) => setTimeout(a, n));
export const log = (...a) => console.log(...a);
export const elog = (...a) => console.error(...a);
export const dlog = (...a) => isDev && console.log(...a);

export const pressed = function(tag, bs = false) {
	tag.style.transition = "0.2s";
	tag.style.transform = "translateY(3px)";
	if (bs) tag.style.boxShadow = "0px 1px 1px #666";
	setTimeout(() => {
		tag.style.transform = "translateY(0px)";
		if (bs) tag.style.boxShadow = "0px 4px 1px #666";
	}, 300);
};

export const downloadFile = function(file) {
	var a = document.createElement('A');
	a.href = file;
	a.download = file.substr(file.lastIndexOf('/') + 1);
	document.body.appendChild(a)
	a.click();
	document.body.removeChild(a);
};

export const sp = {
	off() {
		const sp = $("#sidePanel");
		sp.classList.add("hidden-side-panel");
		return window.sp;
	},
	on() {
		const sp = $("#sidePanel");
		sp.classList.remove("hidden-side-panel");
		return window.sp;
	},
	t(cb) {
		const isOn = !$("#sidePanel").className.split(" ").includes("hidden-side-panel");
		isOn ? this.off() : this.on();
		if (typeof cb == "function") cb();
		return window.sp;
	},
};

export const hmbgr = {
	on: function() {
		let [hr1, hr2, hr3] = $("#hmbgr").children;
		hr1.style.width = "25px";
		hr1.style.transform = "translateY(7.5px) rotate(-45deg)";
		hr2.style.transform = "rotate(45deg)";
		hr3.style.transform = "translateY(-7.5px) rotate(-45deg)";
		return window.hmbgr;
	},
	off: function() {
		let [hr1, hr2, hr3] = $("#hmbgr").children;
		hr1.style.width = "18px";
		hr1.style.transform = "translateY(0px) rotate(0deg)";
		hr2.style.transform = "rotate(0deg)";
		hr3.style.transform = "translateY(0px) rotate(0deg)";
		return window.hmbgr;
	},
	t: function(cb = false) {
		const isOn =
			$("#hmbgr").children[1].style.transform ==
			"rotate(45deg)";
		if (!isOn) {
			window.hmbgr.on();
		} else {
			window.hmbgr.off();
		}

		if (cb) cb();
		setViewport();
		return window.hmbgr;
	},
};

export const _getH = (tag) =>
	window.getComputedStyle(tag).getPropertyValue("height");

export const _toggleHeight = function(id, height, toggle) {
	const me = this;
	this.id = id;
	this.tag = (i) => document.querySelector(i);
	this.tag(id).style.transition = "0.2s";
	this.h = height || _getH(this.tag(id));
	this.t = () => {
		me.tag(me.id).style.height =
			me.tag(me.id).style.height == "0px" ? me.h : "0px";
	};
	if (toggle) this.t();
};

export const onLoad = async (func) => {
	while (!["complete", "interactive"].includes(document.readyState))
		await new Promise((res) => setTimeout(res, 100));
	return typeof func === "function" ? func() : func;
};

export const randInt = (a, z) => (parseInt(Math.random() * z) - a - 1) + a;

export function setViewport() {
	$(":root").style.setProperty("--inner-height", window.innerHeight+"px")
}