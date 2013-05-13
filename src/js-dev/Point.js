SWEEP.Point = function ( svg, x, y, line, i ) {

	this.svg = svg;
	this.x = x;
	this.y = y;
	this.line = line;
	this.intersection = i;

	this.point = document.createElementNS( SWEEP.SVG, 'circle' );
	this.point.setAttribute( 'cx', x );
	this.point.setAttribute( 'cy', y );
	this.point.setAttribute( 'r', 1 );
	this.point.setAttribute( 'class', 'point' );
	this.point.style.fill = this.intersection ? '#157' : '#999';
	this.svg.appendChild( this.point );

};

SWEEP.Point.prototype = {

	constructor: SWEEP.Point,

	animate: function ( sweepline ) {

		this.action = 0;
		this.point.style.fill = 'red';

		var callback = function () {
			this.setSize( (50-Math.abs(this.action-50))*(2/50)+1 );
		}

		var finish = function () {
			this.point.style.fill = this.intersection ? '#157' : '#999';
			sweepline.eventCall();
		}

		new SWEEP.Animation( this, {action:100}, 400, callback, finish );

	},

	setSize: function ( r ) {
		this.point.setAttribute( 'r', r );
	},

	toString: function () {
		return '{x:' + (Math.round(this.x*100)/100) + ',y:' + (Math.round(this.y*100)/100) + '}';
	},

	remove: function () {
		this.svg.removeChild( this.point );
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

