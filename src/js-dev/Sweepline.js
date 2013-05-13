SWEEP.Sweepline = function ( simulation ) {

	this.simulation = simulation;

	this.line = document.createElementNS( SWEEP.SVG, 'line' );
	this.line.setAttribute( 'x1', 0 );
	this.line.setAttribute( 'x2', 100 );
	this.line.setAttribute( 'class', 'sweepline' );
	this.simulation.svg.appendChild( this.line );

	this.position = 0;
	this.setPosition();

	this.status = undefined;
	this.pairs = [];

};

SWEEP.Sweepline.prototype = {

	constructor: SWEEP.Sweepline,

	setPosition: function () {

		this.line.setAttribute( 'y1', this.position );
		this.line.setAttribute( 'y2', this.position );

	},

	eventCall: function () {

		var d = this.current;

		if ( d.intersection ) {

			console.log( 'Event:' + d.toString() + '; Switching; Status:' );
			var t = this.status.clone();
			this.status.clear();
			this.status.insertAll( t );
			var prev = this.status.predecessor( d.line[1] );
			var next = this.status.successor( d.line[0] );
			if ( prev !== null ) { this.pairs.push( [ prev,d.line[1] ] ); }
			if ( next !== null ) { this.pairs.push( [ d.line[0],next ] ); }

		} else {

			if ( d.line.startPoint === d ) {

				console.log( 'Event:' + d.toString() + '; Adding; Status:' );
				this.status.insert( d.line );
				var prev = this.status.predecessor( d.line );
				var next = this.status.successor( d.line );
				if ( prev !== null ) { this.pairs.push( [prev,d.line] ); }
				if ( next !== null ) { this.pairs.push( [d.line,next] ); }

			} else {

				console.log( 'Event:' + d.toString() + '; Removing; Status:' );
				var prev = this.status.predecessor( d.line );
				var next = this.status.successor( d.line );
				this.status.remove( d.line );
				if ( prev !== null && next !== null ) { this.pairs.push( [prev,next] ); }

			}

		}

		this.status.traverse( function ( k, s ) {
			console.log( '\t' + k.toString() );
		}, this );

		this.doPairs();

	},

	doPairs: function () {

		if ( this.pairs.length > 0 ) {
			this.intersectionCheck( this.pairs.pop() );
		} else {
			this.sweepNext();
		}

	},

	intersectionCheck: function ( pair ) {

		var line1 = pair[0];
		var line2 = pair[1];

		this.action = 0;
		line1.line.style.stroke = 'red';
		line2.line.style.stroke = 'red';
		var i = line1.intersect( line2 );
		if ( i !== null ) {
			this.simulation.addPoint( i[0], i[1], [line1,line2], true );
		}

		var callback = function () {
			var size = (50-Math.abs(this.action-50))*(1/50)+0.5;
			line1.line.style.strokeWidth = size + 'px';
			line2.line.style.strokeWidth = size + 'px';
		}

		var finish = function () {
			line1.line.style.stroke = '#ccc';
			line2.line.style.stroke = '#ccc';
			this.doPairs();
		}

		new SWEEP.Animation( this, {action:100}, 400, callback, finish );

	},

	sweepNext: function () {

		var next = this.simulation.events.successor( this.current );
		if ( next !== null ) {
			this.sweepToPoint( next );
		} else {
			this.sweepToEnd();
		}

	},

	sweepToPoint: function ( d ) {

		this.current = d;

		var callback = function () {
			this.setPosition();
		}

		var finish = function () {
			d.animate( this );
		}

		var duration = ( d.y - this.position ) * 25;
		new SWEEP.Animation( this, {position:d.y}, duration, callback, finish );

	},

	sweepToEnd: function () {

		var callback = function () {
			this.setPosition();
		}

		var finish = function () {
			this.simulation.outputIntersections();
			this.simulation.sweepActive = false;
			if( !this.status.isEmpty() ) { console.warn( 'status not empty' ); }
		}

		var duration = ( 100 - this.position ) * 25;
		new SWEEP.Animation( this, {position:100}, duration, callback, finish );

	}

};

