var SWEEP = {

	SVGNS: 'http://www.w3.org/2000/svg',

	animationSpeed: 1,
	sweepActive: false,

	compare: function ( a, b ) {
		return a.compare( b );
	},

	init: function () {

		this.points = new js_cols.RedBlackSet( this.compare );
		this.events = new js_cols.RedBlackSet( this.compare );
		this.status = new js_cols.RedBlackSet( this.compare );
		this.intersections = new js_cols.RedBlackSet( this.compare );

		SWEEP.SVG.init();
		SWEEP.Gui.init();
		SWEEP.Sweepline.init();
		SWEEP.Input();

		animate();
		function animate() {
			requestAnimationFrame( animate );
			TWEEN.update();
		}

	},

	sweep: function () {

		if ( this.sweepActive ) { return; }
		this.sweepActive = true;

		this.cleanup();
		SWEEP.Sweepline.sweepNext( this.events.getMin() );

	},

	cleanup: function () {

		SWEEP.Sweepline.position = 0;
		SWEEP.Sweepline.setPosition();

		this.status.clear();
		this.events.clear();
		this.events.insertAll( SWEEP.points );

		this.intersections.traverse( function ( k, s ) {
			k.remove();
		}, this );
		this.intersections.clear();

	},

	onEnd: function () {

		console.log( '\nIntersections:' );
		this.intersections.traverse( function ( k, s ) {
			console.log( '\t' + k.toString() );
		}, this );

		this.sweepActive = false;
		if( !this.status.isEmpty() ) {
			console.warn( 'status not empty' );
		}

	}

};

