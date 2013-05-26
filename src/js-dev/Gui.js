SWEEP.Gui = {

	init: function () {

		this.random = document.createElement( 'div' );
		this.random.innerHTML = '+1';
		this.random.setAttribute( 'class', 'button' );
		this.random.style.position = 'absolute';
		this.random.style.bottom = '0px';
		this.random.style.left = '0px';
		document.body.appendChild( this.random );

		this.start = document.createElement( 'div' );
		this.start.innerHTML = 'Sweep';
		this.start.setAttribute( 'class', 'button' );
		this.start.style.position = 'absolute';
		this.start.style.bottom = '0px';
		this.start.style.left = '130px';
		document.body.appendChild( this.start );

		function addRandomLine() {
			new SWEEP.Line(
				Math.random() * SWEEP.SVG.w,
				Math.random() * SWEEP.SVG.h,
				Math.random() * SWEEP.SVG.w,
				Math.random() * SWEEP.SVG.h
			);
		}
		this.random.addEventListener( 'click', addRandomLine, false );

		function sweep() {
			SWEEP.sweep();
		}
		this.start.addEventListener( 'click', sweep, false );

	}

};

