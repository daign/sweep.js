SWEEP.Point = function ( svg, x, y, i ) {

	this.svg = svg;
	this.x = x;
	this.y = y;
	this.lines = new js_cols.RedBlackSet( SWEEP.compare );

	this.intersection = i;

};

SWEEP.Point.prototype = {

	constructor: SWEEP.Point,

	draw: function () {
		this.point = document.createElementNS( SWEEP.SVGNS, 'circle' );
		this.point.setAttribute( 'cx', this.x );
		this.point.setAttribute( 'cy', this.y );
		this.point.setAttribute( 'r', 1 );
		this.point.setAttribute( 'class', 'point' );
		this.point.style.fill = this.intersection ? '#157' : '#999';
		this.svg.appendChild( this.point );
	},

	remove: function () {
		this.svg.removeChild( this.point );
	},

	addLine: function ( line ) {
		this.lines.insert( line );
	},

	animate: function ( sweepline ) {

		this.action = -100;
		this.point.style.fill = 'red';

		var animation = new TWEEN.Tween( this )
		.to( { action: 100 }, 400 * SWEEP.animationSpeed )
		.onUpdate( function () {
			this.setSize( (100-Math.abs(this.action)) * (2/100) + 1 );
		} )
		.onComplete( function () {
			this.point.style.fill = this.intersection ? '#157' : '#999';
			sweepline.eventCall();
		} )
		.start();

	},

	setSize: function ( r ) {
		this.point.setAttribute( 'r', r );
	},

	toString: function () {
		return '{x:' + (Math.round(this.x*100)/100) + ',y:' + (Math.round(this.y*100)/100) + '}';
	},

	compare: function ( b ) {
		if ( this.y < b.y ) {
			return -1;
		} else if ( b.y < this.y ) {
			return 1;
		} else {
			return 0;
		}
	}

};

