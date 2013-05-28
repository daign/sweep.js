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
/*		this.buttons.push( new SWEEP.Button( 'About', function () {
			console.log( 'about' );
		} ) );
*/
	},

	setDimensions: function ( y, width, height ) {

		this.background.setAttribute( 'y', y );
		this.background.setAttribute( 'width', width );
		this.background.setAttribute( 'height', height );

		var spacing = Math.round( height*0.1 );

		var x = spacing;
		for ( var i = 0; i < this.buttons.length; i++ ) {
			x += spacing + this.buttons[ i ].setGeometry( x, y, height );
		}

	}

};

