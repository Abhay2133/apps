import {$,wait,hmbgr,sp, setViewport,pressed} from "/js/hlpr.js"
import {setIcons} from "/js/icons.js";

const t_uc = {
	get uc() { return $(".uc-menu") },
	off: async function() {
		this.uc.style.opacity = 0;
		this.uc.style.transform = "translateY(20px)";
		await wait(300);
		this.uc.style.display = "none";
	},
	on: async function() {
		this.uc.style.display = 'block';
		await wait(1);
		this.uc.style.opacity = 1;
		this.uc.style.transform = "translateY(0px)";
	},
	t: function() {
		const isOn = this.uc.style.transform == "translateY(0px)";
		isOn ? this.off() : this.on();
	}
}

t_uc.off();
setIcons();

$(".user-control > div[icon=user]").addEventListener("click", () => t_uc.t())

window.hmbgr = hmbgr;
window.sp = sp;
window.onresize = (setViewport);
window.pressed = pressed
window.onresize = (setViewport);
setViewport();