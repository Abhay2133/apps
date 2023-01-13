(async function() {
	if (document.title != "WhatsUp") {
		delete window.t_fab;
		delete window._show_users;
		return;
	}

	window.t_fab = {
		get fab_opts() { return $(".fab-opts") },
		get btn() { return $(".fab > [icon=plus]") },
		off: function() {
			this.btn.style.transform = 'rotate(0deg)';
			this.fab_opts.style.height = '0';
			this.fab_opts.style.opacity = '0';
		},
		on: function() {
			// log(this.btn.style.transform);
			this.btn.style.transform = 'rotate(225deg)';
			// log(this.btn.style.transform);
			this.fab_opts.style.height = 55 * 3 + 'px';
			this.fab_opts.style.opacity = '1';
		},
		t: function(cb) {
			const isOn = this.fab_opts.style.opacity == '1';
			isOn ? this.off() : this.on();
			if (typeof cb == 'function') cb();
		}
	}

	window.t_usr = async (me) => {
		me.style.setProperty("background", getComputedStyle(me).getPropertyValue("--fab-opts-hover-bg"));
		$("#chat-list").style.opacity = 0;
		await wait(200);
		$("#chat-list").style.display = "none";
		$("#user-list").style.display = "block";
		await wait(10);
		$("#user-list").style.opacity = 1;
		//log($("#user-list").innerHTML);
	}

	window.usr_menu = {
		get c () { return $("#chat-list"); },
		get u () { return $("#user-list") },
		async on(me) {
			for(let opt of $$(".fab-opts>div")) opt.classList.remove("fab-opts-hovered");
			$("#wu-search").setAttribute("placeholder", "Search a User");
			me.classList.add("fab-opts-hovered"); //me.style.setProperty("background", getComputedStyle(me).getPropertyValue("--fab-opts-hover-bg"));
			this.c.style.opacity = 0;
			await wait(200);
			this.c.style.display = "none";
			this.u.style.display = "block";
			await wait(10);
			this.u.style.opacity = 1;
		},
		async off (me){
			// me.style.transform = "rotate("+randInt(0, 360)+"deg)";
			$("#wu-search").setAttribute("placeholder", "Search a Chat");
			me.classList.remove("fab-opts-hovered"); //style.setProperty("background", "transparent");
			this.u.style.opacity = 0;
			await wait(200);
			this.c.style.display = "block";
			this.u.style.display = "none";
			await wait(10);
			this.c.style.opacity = 1;
		},
		t (me, cb){
			const isOn = me.className.split(" ").includes("fab-opts-hovered");
			isOn ? this.off(me) : this.on(me);

			if(typeof cb === "function") cb();
		}
	}
	window.gm = () => {dlog("Group Mode !")}


})();