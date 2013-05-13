SWEEP.Gui = {

	init: function () {

		this.start = document.createElement( 'div' );
		this.start.innerHTML = 'Sweep';
		this.start.setAttribute( 'class', 'button' );
		document.body.appendChild( this.start );

		function sweep() {
			SWEEP.sweep();
		}
		this.start.addEventListener( 'click', sweep, false );

	}

};

