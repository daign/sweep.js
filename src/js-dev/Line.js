SWEEP.Line = function ( simulation ) {

	this.simulation = simulation;
	this.startPoint = undefined;
	this.endPoint = undefined;

	this.line = document.createElementNS( SWEEP.SVG, 'line' );
	this.line.setAttribute( 'class', 'line' );
	this.simulation.svg.appendChild( this.line );

};

SWEEP.Line.prototype = {

	constructor: SWEEP.Line,

	setPoints: function ( point1, point2 ) {

		if ( point1.y < point2.y ) {
			this.startPoint = point1;
			this.endPoint = point2;
		} else {
			this.startPoint = point2;
			this.endPoint = point1;
		}
		this.line.setAttribute( 'x1', this.startPoint.x );
		this.line.setAttribute( 'y1', this.startPoint.y );
		this.line.setAttribute( 'x2', this.endPoint.x );
		this.line.setAttribute( 'y2', this.endPoint.y );

	},

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
		var p = this.simulation.sweepline.position + 0.001;
		var m = ( this.endPoint.y - this.startPoint.y ) / ( this.endPoint.x - this.startPoint.x );
		var n = this.endPoint.y - m * this.endPoint.x;
		return (p-n)/m;
	},

	intersect: function ( l2 ) {

		var l1 = this;
		var ax = l1.startPoint.x;
		var ay = l1.startPoint.y;
		var bx = l1.endPoint.x;
		var by = l1.endPoint.y;
		var cx = l2.startPoint.x;
		var cy = l2.startPoint.y;
		var dx = l2.endPoint.x;
		var dy = l2.endPoint.y;

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

		return '{line:[' + this.startPoint.toString() + ',' + this.endPoint.toString() + ']}';

	}

};

