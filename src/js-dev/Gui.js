SWEEP.Gui = {

	init: function () {

		this.start = document.createElement( 'div' );
		this.start.innerHTML = 'Sweep';
		this.start.setAttribute( 'class', 'button' );
		this.start.style.position = 'absolute';
		this.start.style.bottom = '0px';
		this.start.style.left = '0px';
		document.body.appendChild( this.start );

		function sweep() {
			SWEEP.sweep();
		}
		this.start.addEventListener( 'click', sweep, false );

	}

};

