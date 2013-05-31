SWEEP.SVG = {

	init: function () {

		var self = this;
		this.context = document.createElementNS( SWEEP.SVGNS, 'svg' );
		this.context.setAttribute( 'xmlns:xlink', SWEEP.XLink );
		document.body.appendChild( this.context );

		this.context.appendChild( this.loadXML( 'images/sweep.svg' ).documentElement.firstElementChild.nextElementSibling );

		this.addGroup( 'sweepline' );
		this.addGroup( 'line' );
		this.addGroup( 'point' );
		this.addGroup( 'gui' );

		function onWindowResize() {
			self.resize();
		}
		window.addEventListener( 'resize', onWindowResize, false );

	},

	resize: function () {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.drawingAreaHeight = Math.min( Math.round( this.height * 0.9 ), this.height-20 );
		this.context.setAttribute( 'viewBox', '0, 0,' + this.width + ',' + this.height );
		this.context.setAttribute( 'width', this.width + 'px' );
		this.context.setAttribute( 'height', this.height + 'px' );
		SWEEP.Sweepline.setWidth( this.width );
		SWEEP.Gui.setDimensions( this.drawingAreaHeight, this.width, this.height-this.drawingAreaHeight );
		SWEEP.Info.setDimensions( this.width, this.drawingAreaHeight );
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

