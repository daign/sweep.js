SWEEP.Line = function ( x1, y1, x2, y2 ) {

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = y2;

	this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
	this.line.setAttribute( 'x1', this.x1 );
	this.line.setAttribute( 'y1', this.y1 );
	this.line.setAttribute( 'x2', this.x2 );
	this.line.setAttribute( 'y2', this.y2 );
	this.line.setAttribute( 'class', 'line' );
	SWEEP.SVG.appendChild( this.line );

	var point1 = new SWEEP.Point( x1, y1 );
	var point2 = new SWEEP.Point( x2, y2 );
	point1.draw();
	point2.draw();
	SWEEP.points.insert( point1 );
	SWEEP.points.insert( point2 );

	if ( point2.compare( point1 ) > 0 ) {

		point1.starting.insert( this );
		point2.ending.insert( this );

	} else {

		point2.starting.insert( this );
		point1.ending.insert( this );

	}

};

SWEEP.Line.prototype = {

	constructor: SWEEP.Line,

	compare: function ( b ) {
		if ( this.getSweepIntersection() < b.getSweepIntersection() ) {
			return -1;
		} else if ( b.getSweepIntersection() < this.getSweepIntersection() ) {
			return 1;
		} else {
			return 0;
		}
	},

	getSweepIntersection: function () {

		var p = SWEEP.Sweepline.position + 0.0001;

		if ( (this.y2-this.y1) === 0 ) {
			return null;
		} else {
			return ( this.x1*this.y2 - this.y1*this.x2 + p*(this.x2-this.x1) ) / ( this.y2 - this.y1 );
		}

	},

	intersect: function ( l2 ) {

		var ax = this.x1;
		var ay = this.y1;
		var bx = this.x2;
		var by = this.y2;
		var cx = l2.x1;
		var cy = l2.y1;
		var dx = l2.x2;
		var dy = l2.y2;

		var n = (bx-ax) * (dy-cy) - (by-ay) * (dx-cx);
		if ( n !== 0 ) {
			var s = ((cx-ax)*(dy-cy) - (cy-ay)*(dx-cx)) / n;
			var t = (ax-cx+s*(bx-ax))/(dx-cx)
			if ( 0<=s && s<=1 && 0<=t && t<=1 ) {
				var x = ax + s*(bx-ax);
				var y = ay + s*(by-ay);
				return [x,y];
			}
		}

		return null;

	},

	toString: function () {

		return '{line:[' + this.x1 + ',' + this.y1 + ',' + this.x2 + ',' + this.y2 + ']}';

	}

};
