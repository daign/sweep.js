SWEEP.SVG = {

	init: function () {

		var self = this;
		this.context = document.createElementNS( SWEEP.SVGNS, 'svg' );
		document.body.appendChild( this.context );

		this.context.appendChild( this.loadXML( 'images/sweep.svg' ).documentElement.firstElementChild.nextElementSibling );

		this.addGroup( 'sweepline' );
		this.addGroup( 'line' );
		this.addGroup( 'point' );

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

	addGroup: function ( name ) {
		this[ name ] = document.createElementNS( SWEEP.SVGNS, 'g' );
		this.context.appendChild( this[ name ] );
	},

	append: function ( element, group ) {
		this[ group ].appendChild( element );
	},

	remove: function ( element, group ) {
		this[ group ].removeChild( element );
	},

	removeAll: function ( group ) {
		while ( this[ group ].hasChildNodes() ) {
			this[ group ].removeChild( this[ group ].firstChild );
		}
	},

	loadXML: function ( file ) {

		var request = new XMLHttpRequest();
		request.open( 'GET', file, false );
		request.setRequestHeader( 'Content-Type', 'text/xml' );
		request.send( '' );

		return request.responseXML;

	}

};

