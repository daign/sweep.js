SWEEP.Sweepline = {

	position: 0,
	pairs: [],

	init: function () {

		this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
		this.line.setAttribute( 'x1', 0 );
		this.line.setAttribute( 'x2', 100 );
		this.line.setAttribute( 'class', 'sweepline' );
		SWEEP.SVG.appendChild( this.line );

		this.setPosition();

	},

	setPosition: function () {

		this.line.setAttribute( 'y1', this.position );
		this.line.setAttribute( 'y2', this.position );

	},

	eventCall: function () {

		var d = this.current;

		if ( d.intersection ) {

			console.log( 'Event:' + d.toString() + '; Switching; Status:' );
			var t = SWEEP.status.clone();
			SWEEP.status.clear();
			SWEEP.status.insertAll( t );
			var prev = SWEEP.status.predecessor( d.lines.getMax() );
			var next = SWEEP.status.successor( d.lines.getMin() );
			if ( prev !== null ) { this.pairs.push( [ prev,d.lines.getMax() ] ); }
			if ( next !== null ) { this.pairs.push( [ d.lines.getMin(),next ] ); }

		} else {

			var line = d.lines.getMin();

			if ( line.startPoint === d ) {

				console.log( 'Event:' + d.toString() + '; Adding; Status:' );
				SWEEP.status.insert( line );
				var prev = SWEEP.status.predecessor( line );
				var next = SWEEP.status.successor( line );
				if ( prev !== null ) { this.pairs.push( [prev,line] ); }
				if ( next !== null ) { this.pairs.push( [line,next] ); }

			} else {

				console.log( 'Event:' + d.toString() + '; Removing; Status:' );
				var prev = SWEEP.status.predecessor( line );
				var next = SWEEP.status.successor( line );
				SWEEP.status.remove( line );
				if ( prev !== null && next !== null ) { this.pairs.push( [prev,next] ); }

			}

		}

		SWEEP.status.traverse( function ( k, s ) {
			console.log( '\t' + k.toString() );
		}, this );

		this.doPairs();

	},

	doPairs: function () {

		if ( this.pairs.length > 0 ) {
			this.intersectionCheck( this.pairs.pop() );
		} else {
			this.sweepNext( SWEEP.events.successor( this.current ) );
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

			var point = new SWEEP.Point( i[0], i[1], true );
			if ( !SWEEP.events.contains( point ) ) {
				point.addLine( line1 );
				point.addLine( line2 );
				point.draw();
				SWEEP.events.insert( point );
				SWEEP.intersections.insert( point );
			}

		}

		var animation = new TWEEN.Tween( this )
		.to( { action: 100 }, 400 * SWEEP.animationSpeed )
		.onUpdate( function () {
			var size = (50-Math.abs(this.action-50))*(1/50)+0.5;
			line1.line.style.strokeWidth = size + 'px';
			line2.line.style.strokeWidth = size + 'px';
		} )
		.onComplete( function () {
			line1.line.style.stroke = '#ccc';
			line2.line.style.stroke = '#ccc';
			this.doPairs();
		} )
		.start();

	},

	sweepNext: function ( next ) {

		if ( next !== null ) {

			this.current = next;
			this.sweepTo( next.y, function () {
				next.animate();
			} );

		} else {

			this.sweepTo( 100, function () {
				SWEEP.onEnd();
			} );

		}

	},

	sweepTo: function ( y, onComplete ) {

		var animation = new TWEEN.Tween( this )
		.to( { position: y }, ( y - this.position ) * 25 * SWEEP.animationSpeed )
		.onUpdate( function () {
			this.setPosition();
		} )
		.onComplete( onComplete )
		.start();

	}

};

