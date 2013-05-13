SWEEP.Simulation = function ( width ) {

	var self = this;
	this.width = width;
	this.sweepActive = false;

	this.svg = document.createElementNS( SWEEP.SVGNS, 'svg' );
	this.svg.setAttribute( 'viewBox', '-1, -1, 102, 102' );
	this.svg.setAttribute( 'width', this.width + 'px' );
	this.svg.setAttribute( 'height', this.width + 'px' );
	document.body.appendChild( this.svg );

	bg = document.createElementNS( SWEEP.SVGNS, 'rect' );
	bg.setAttribute( 'x', -1 );
	bg.setAttribute( 'y', -1 );
	bg.setAttribute( 'width', 102 );
	bg.setAttribute( 'height', 102 );
	bg.setAttribute( 'class', 'bg' );
	this.svg.appendChild( bg );

	this.sweepline = new SWEEP.Sweepline( this );

	this.points = new js_cols.RedBlackSet( SWEEP.compare );
	this.events = new js_cols.RedBlackSet( SWEEP.compare );
	this.intersections = [];

	this.addLine( 29, 42, 70, 10 );
	this.addLine( 70, 70, 40, 22 );
	this.addLine( 85, 60, 20, 80 );
	this.addLine( 10, 32, 60, 90 );
	this.addLine( 25, 95, 65, 4 );
	this.addLine( 12, 14, 22, 26 );
	this.addLine( 79, 7, 93, 55 );
	this.addLine( 67, 53, 97, 44 );

	this.start = document.createElement( 'div' );
	this.start.innerHTML = 'Sweep';
	this.start.setAttribute( 'class', 'button' );
	function sweep() { self.sweep(); }
	this.start.addEventListener( 'click', sweep, false );
	document.body.appendChild( this.start );

	animate();
	function animate() {
		requestAnimationFrame( animate );
		TWEEN.update();
	}

};

SWEEP.Simulation.prototype = {

	constructor: SWEEP.Simulation,

	addPoint: function ( x, y, line ) {

		var point = new SWEEP.Point( this.svg, x, y, false );
		point.addLine( line );
		point.draw();
		this.points.insert( point );
		return point;

	},

	addLine: function ( x1, y1, x2, y2 ) {

		var line = new SWEEP.Line( this );
		var point1 = this.addPoint( x1, y1, line );
		var point2 = this.addPoint( x2, y2, line );
		line.setPoints( point1, point2 );

	},

	sweep: function () {

		if ( this.sweepActive ) { return; }
		this.sweepActive = true;

		this.cleanup();

		this.sweepline.sweepNext( this.events.getMin() );

	},

	cleanup: function () {

		this.sweepline.position = 0;
		this.sweepline.setPosition();
		this.sweepline.status.clear();

		this.events.clear();
		this.events.insertAll( this.points );

		for ( var i = 0; i < this.intersections.length; i++ ) {
			this.intersections[i].remove();
		}
		this.intersections = [];

	},

	onEnd: function () {

		console.log( '\nIntersections:' );
		for ( var i = 0; i < this.intersections.length; i++ ) {
			console.log( '\t' + this.intersections[ i ].toString() );
		}

		this.sweepActive = false;
		if( !this.sweepline.status.isEmpty() ) { console.warn( 'status not empty' ); }

	}

};

