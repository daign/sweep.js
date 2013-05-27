SWEEP.Gui = {

	init: function () {

		this.random = document.createElement( 'div' );
		this.random.innerHTML = '<br/>Random';
		this.random.setAttribute( 'class', 'button' );
		this.random.style.position = 'absolute';
		this.random.style.bottom = '0px';
		this.random.style.left = '0px';

		this.clear = document.createElement( 'div' );
		this.clear.innerHTML = '<br/>Clear';
		this.clear.setAttribute( 'class', 'button' );
		this.clear.style.position = 'absolute';
		this.clear.style.bottom = '0px';
		this.clear.style.left = '90px';

		this.sweep = document.createElement( 'div' );
		this.sweep.innerHTML = '<br/>Sweep';
		this.sweep.setAttribute( 'class', 'button' );
		this.sweep.style.position = 'absolute';
		this.sweep.style.bottom = '0px';
		this.sweep.style.left = '180px';

		document.body.appendChild( this.random );
		document.body.appendChild( this.clear );
		document.body.appendChild( this.sweep );

		function addRandomLine() {
			if ( SWEEP.sweepActive ) { return; }
			new SWEEP.Line(
				Math.random() * SWEEP.SVG.w,
				Math.random() * SWEEP.SVG.h,
				Math.random() * SWEEP.SVG.w,
				Math.random() * SWEEP.SVG.h
			);
		}

		function clear() {
			if ( SWEEP.sweepActive ) { return; }
			SWEEP.SVG.removeAll( 'line' );
			SWEEP.SVG.removeAll( 'point' );
			SWEEP.points.clear();
			SWEEP.events.clear();
		}

		function sweep() {
			if ( SWEEP.sweepActive ) { return; }
			SWEEP.sweep();
		}

		this.random.addEventListener( 'click', addRandomLine, false );
		this.clear.addEventListener( 'click', clear, false );
		this.sweep.addEventListener( 'click', sweep, false );

	}

};

