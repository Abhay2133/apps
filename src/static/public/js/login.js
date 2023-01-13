(function(argument) {
	if (document.title != "LOGIN") {
		delete window.t_psi;
		return;
	}

	window.t_psi = function(me, name) {
		me.clicked = !!!me.clicked;
		const attr = me.clicked ? "text" : "password"
		$(`input[name=${name}]`).setAttribute("type", attr);

		let path = me.children[0].children[0];
		let color = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#333' : '#ccc'
		const fill = me.clicked ? 'red' : color;
		path.style.fill= fill;
		// log(me.clicked, fill,window.matchMedia('(max-width: 600px)').matches)
	}
})();