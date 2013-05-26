SWEEP.SVG = {

	init: function () {

		var self = this;
		this.context = document.createElementNS( SWEEP.SVGNS, 'svg' );
		document.body.appendChild( this.context );

		this.context.appendChild( this.loadXML( 'images/sweep.svg' ).documentElement.firstElementChild.nextElementSibling );

		this.lines = document.createElementNS( SWEEP.SVGNS, 'g' );
		this.context.appendChild( this.lines );

		this.points = document.createElementNS( SWEEP.SVGNS, 'g' );
		this.context.appendChild( this.points );

		function onWindowResize() {
			self.resize();
		}
		window.addEventListener( 'resize', onWindowResize, false );

	},

	resize: function () {
		this.w = window.innerWidth;
		this.h = window.innerHeight;
		this.context.setAttribute( 'viewBox', '0, 0,' + this.w + ',' + this.h );
		this.context.setAttribute( 'width', this.w + 'px' );
		this.context.setAttribute( 'height', this.h + 'px' );
		SWEEP.Sweepline.setWidth( this.w );
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
	},

	loadXML: function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, false );
		request.setRequestHeader( 'Content-Type', 'text/xml' );
		request.send( '' );

		return request.responseXML;

	}

};

