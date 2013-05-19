SWEEP.Sweepline = {

	position: 0,
	pairs: [],

	init: function () {

		this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
		this.line.setAttribute( 'x1', 0 );
		this.line.setAttribute( 'x2', 100 );
		this.line.setAttribute( 'class', 'sweepline' );
		SWEEP.SVG.appendLine( this.line );

		this.setPosition();

	},

	setPosition: function () {

		this.line.setAttribute( 'y1', this.position );
		this.line.setAttribute( 'y2', this.position );

	},

	eventCall: function () {

		var d = this.current;
		var actions = [];

		if ( !d.intersecting.isEmpty() ) {

			var t = SWEEP.status.clone();
			SWEEP.status.clear();
			SWEEP.status.insertAll( t );

		}

		if ( !d.ending.isEmpty() ) {

			actions.push( 'Removing' );
			var prev = SWEEP.status.predecessor( d.ending.getMin() );
			var next = SWEEP.status.successor( d.ending.getMax() );
			d.ending.traverse( function ( k, s ) {
				SWEEP.status.remove( k );
			}, this );
			this.pairs.push( [ prev, next ] );

		}

		if ( !d.intersecting.isEmpty() ) {

			actions.push( 'Switching' );
			var prev = SWEEP.status.predecessor( d.intersecting.getMax() );
			var next = SWEEP.status.successor( d.intersecting.getMin() );
			this.pairs.push( [ prev, d.intersecting.getMax() ] );
			this.pairs.push( [ d.intersecting.getMin(), next ] );

		}

		if ( !d.starting.isEmpty() ) {

			actions.push( 'Adding' );
			var line = d.starting.getMin();
			SWEEP.status.insert( line );
			var prev = SWEEP.status.predecessor( line );
			var next = SWEEP.status.successor( line );
			this.pairs.push( [ prev, line ] );
			this.pairs.push( [ line, next ] );

		}

		console.log( 'Event: ' + d.toString() + '; Actions: ' + actions.join(', ') + '; Status:' );
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

		if ( line1 !== null && line2 !== null ) {

			this.action = 0;
			line1.line.style.stroke = 'red';
			line2.line.style.stroke = 'red';
			var i = line1.intersect( line2 );
			if ( i !== null ) {

				var point = new SWEEP.Point( i[0], i[1] );
				if ( !SWEEP.events.contains( point ) ) {
					point.draw();
					SWEEP.events.insert( point );
				} else {
					point = SWEEP.events.get_( point ).key;
				}
				point.intersecting.insert( line1 );
				point.intersecting.insert( line2 );

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

		} else {

			this.doPairs();

		}

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

