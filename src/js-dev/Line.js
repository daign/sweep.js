SWEEP.Line = function ( x1, y1, x2, y2 ) {

	this.x1 = x1;
	this.y1 = y1;
	this.x2 = x2;
	this.y2 = ( y1 !== y2 ) ? y2 : y2 + 1;

	this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
	this.line.setAttribute( 'x1', this.x1 );
	this.line.setAttribute( 'y1', this.y1 );
	this.line.setAttribute( 'x2', this.x2 );
	this.line.setAttribute( 'y2', this.y2 );
	this.line.setAttribute( 'class', 'line' );
	SWEEP.SVG.append( this.line, 'line' );

	var point1 = this.addPoint( this.x1, this.y1 );
	var point2 = this.addPoint( this.x2, this.y2 );

	if ( point2.compare( point1 ) > 0 ) {

		point1.starting.insert( this );
		point2.ending.insert( this );

	} else {

		point2.starting.insert( this );
		point1.ending.insert( this );

	}

	point1.setStyle();
	point2.setStyle();

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

	addPoint: function ( x, y ) {

		var point = new SWEEP.Point( x, y );

		if ( !SWEEP.points.contains( point ) ) {
			point.draw();
			SWEEP.points.insert( point );
		} else {
			point = SWEEP.points.get_( point ).key;
		}

		return point;

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

			var s = ((ax-cx)*(dy-cy) - (ay-cy)*(dx-cx)) / -n;
			var t = ((cx-ax)*(by-ay) - (cy-ay)*(bx-ax)) / n;

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

