SWEEP.Gui = {

	init: function () {

		this.background = document.createElementNS( SWEEP.SVGNS, 'rect' );
		this.background.setAttribute( 'x', 0 );
		this.background.setAttribute( 'class', 'guibackground' );
		SWEEP.SVG.append( this.background, 'gui' );

		this.buttons = [];

		this.buttons.push( new SWEEP.Button( 'Random', function () {
			new SWEEP.Line(
				Math.random() * SWEEP.SVG.width,
				Math.random() * SWEEP.SVG.drawingAreaHeight,
				Math.random() * SWEEP.SVG.width,
				Math.random() * SWEEP.SVG.drawingAreaHeight
			);
		} ) );
		this.buttons.push( new SWEEP.Button( 'Clear', function () {
			SWEEP.SVG.removeAll( 'line' );
			SWEEP.SVG.removeAll( 'point' );
			SWEEP.points.clear();
			SWEEP.events.clear();
		} ) );
		this.buttons.push( new SWEEP.Button( 'Sweep', function () {
			SWEEP.sweep();
		} ) );
	/*	this.buttons.push( new SWEEP.Button( 'About', function () {
			console.log( 'about' );
		} ) );
*/
	},

	setDimensions: function ( w, h, d ) {

		this.background.setAttribute( 'y', d );
		this.background.setAttribute( 'width', w );
		this.background.setAttribute( 'height', h-d );

		var left = 0;
		for ( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[ i ].setGeometry( left );
			left += 90;
		}

	}

};

