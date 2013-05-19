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

		this.lines = document.createElementNS( SWEEP.SVGNS, 'g' );
		this.context.appendChild( this.lines );

		this.points = document.createElementNS( SWEEP.SVGNS, 'g' );
		this.context.appendChild( this.points );

	},

	appendPoint: function ( a ) {
		this.points.appendChild( a );
	},

	removePoint: function ( a ) {
		this.points.removeChild( a );
	},

	appendLine: function ( a ) {
		this.lines.appendChild( a );
	},

	removeLine: function ( a ) {
		this.lines.removeChild( a );
	}

};

