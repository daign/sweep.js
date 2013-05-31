var SWEEP = {

	SVGNS: 'http://www.w3.org/2000/svg',
	XLink: 'http://www.w3.org/1999/xlink',

	animationSpeed: 1,
	sweepActive: false,

	compare: function ( a, b ) {
		return a.compare( b );
	},

	init: function () {

		this.points = new js_cols.RedBlackSet( this.compare );
		this.events = new js_cols.RedBlackSet( this.compare );
		this.status = new js_cols.RedBlackSet( this.compare );

		SWEEP.SVG.init();
		SWEEP.Gui.init();
		SWEEP.Info.init();
		SWEEP.Sweepline.init();
		SWEEP.SVG.resize();

		SWEEP.Input();

		animate();
		function animate() {
			requestAnimationFrame( animate );
			TWEEN.update();
		}

	},

	sweep: function () {

		this.sweepActive = true;
		this.cleanup();
		SWEEP.Sweepline.sweepNext( !this.events.isEmpty() ? this.events.getMin() : null );

	},

	cleanup: function () {

		this.events.traverse( function ( k, s ) {
			k.intersecting.clear();
			k.setStyle();
			if ( k.starting.isEmpty() && k.ending.isEmpty() ) {
				k.remove();
			}
		}, this );
		this.events.clear();
		this.events.insertAll( SWEEP.points );

		this.status.clear();

	},

	onEnd: function () {

		SWEEP.Sweepline.position = -1;
		SWEEP.Sweepline.setPosition();

		console.log( '\nIntersections:' );
		this.events.traverse( function ( k, s ) {
			if ( !k.intersecting.isEmpty() ) {
				console.log( '\t' + k.toString() );
			}
		}, this );

		this.sweepActive = false;
		if( !this.status.isEmpty() ) {
			console.warn( 'status not empty' );
		}

	}

};

