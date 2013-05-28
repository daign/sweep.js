SWEEP.Sweepline = {

	position: -1,
	pairs: [],

	init: function () {

		this.rect = document.createElementNS( SWEEP.SVGNS, 'rect' );
		this.rect.setAttribute( 'x', 0 );
		this.rect.setAttribute( 'height', 40 );
		this.rect.setAttribute( 'class', 'sweeprect' );
		SWEEP.SVG.append( this.rect, 'sweepline' );

		this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
		this.line.setAttribute( 'x1', 0 );
		this.line.setAttribute( 'class', 'sweepline' );
		SWEEP.SVG.append( this.line, 'sweepline' );

		this.setPosition();

	},

	setWidth: function ( w ) {
		this.rect.setAttribute( 'width', w );
		this.line.setAttribute( 'x2', w );
	},

	setPosition: function () {

		this.rect.setAttribute( 'y', this.position - 40 );
		this.line.setAttribute( 'y1', this.position );
		this.line.setAttribute( 'y2', this.position );

	},

	eventCall: function () {

		var d = this.current;
		var actions = [];

		if (
			   !d.intersecting.isEmpty()
			|| ( d.starting.size + d.ending.size ) > 1
		) {

			SWEEP.status = SWEEP.status.clone();
			d.starting = d.starting.clone();
			d.ending = d.ending.clone();
			d.intersecting = d.intersecting.clone();

			if (
				   !d.ending.isEmpty()
				&& d.intersecting.isSubsetOf( d.ending )
				&& d.starting.isEmpty()
			) {

				actions.push( 'Removing' );
				var prev = SWEEP.status.predecessor( d.ending.getMin() );
				var next = SWEEP.status.successor( d.ending.getMax() );
				SWEEP.status.removeAll( d.ending );
				this.pairs.push( [ prev, next ] );

			} else {

				var continuing = d.intersecting.clone();

				if ( !d.ending.isEmpty() ) {
					actions.push( 'Removing' );
					continuing.removeAll( d.ending );
					SWEEP.status.removeAll( d.ending );
					d.intersecting.insertAll( d.ending );
					d.setStyle();
				}

				if ( !continuing.isEmpty() ) {
					actions.push( 'Switching' );
				}

				if ( !d.starting.isEmpty() ) {
					actions.push( 'Adding' );
					continuing.insertAll( d.starting );
					SWEEP.status.insertAll( d.starting );
					d.intersecting.insertAll( d.starting );
					d.setStyle();
				}

				var min = continuing.getMin();
				var prev = SWEEP.status.predecessor( min );
				this.pairs.push( [ prev, min ] );

				var max = continuing.getMax();
				var next = SWEEP.status.successor( max );
				this.pairs.push( [ max, next ] );

			}

		} else if ( !d.ending.isEmpty() ) {

			actions.push( 'Removing' );
			var line = d.ending.getMin();
			var prev = SWEEP.status.predecessor( line );
			var next = SWEEP.status.successor( line );
			SWEEP.status.remove( line );
			this.pairs.push( [ prev, next ] );

		} else if ( !d.starting.isEmpty() ) {

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
				point.setStyle();

			}

			var animation = new TWEEN.Tween( this )
			.to( { action: 100 }, 400 * SWEEP.animationSpeed )
			.onUpdate( function () {
				var size = ((50-Math.abs(this.action-50))*(1/50)+0.5)*4;
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

		} else if ( this.position < SWEEP.SVG.drawingAreaHeight + 41 ) {

			this.sweepTo( SWEEP.SVG.drawingAreaHeight + 41, function () {
				SWEEP.onEnd();
			} );

		} else {

			SWEEP.onEnd();

		}

	},

	sweepTo: function ( y, onComplete ) {

		var animation = new TWEEN.Tween( this )
		.to( { position: y }, ( y - this.position ) * 5 * SWEEP.animationSpeed )
		.onUpdate( function () {
			this.setPosition();
		} )
		.onComplete( onComplete )
		.start();

	}

};

