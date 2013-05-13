SWEEP.SVG = {

	init: function () {

		this.context = document.createElementNS( SWEEP.SVGNS, 'svg' );
		this.context.setAttribute( 'viewBox', '-1, -1, 102, 102' );
		this.context.setAttribute( 'width', 400 + 'px' );
		this.context.setAttribute( 'height', 400 + 'px' );
		document.body.appendChild( this.context );

		bg = document.createElementNS( SWEEP.SVGNS, 'rect' );
		bg.setAttribute( 'x', -1 );
		bg.setAttribute( 'y', -1 );
		bg.setAttribute( 'width', 102 );
		bg.setAttribute( 'height', 102 );
		bg.setAttribute( 'class', 'bg' );
		this.context.appendChild( bg );

	},

	appendChild: function ( a ) {
		this.context.appendChild( a );
	},

	removeChild: function ( a ) {
		this.context.removeChild( a );
	}

};

