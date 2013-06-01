SWEEP.Button = function ( text, action ) {

	this.rect = document.createElementNS( SWEEP.SVGNS, 'rect' );
	this.rect.setAttribute( 'class', 'button' );
	SWEEP.SVG.append( this.rect, 'gui' );

	this.text = document.createElementNS( SWEEP.SVGNS, 'text' );
	this.text.setAttribute( 'class', 'buttonText' );
	SWEEP.SVG.append( this.text, 'gui' );

	var textNode = document.createTextNode( text );
	this.text.appendChild( textNode );

	function onclick() {
		if ( SWEEP.sweepActive ) { return; }
		action();
	}

	this.rect.addEventListener( 'click', onclick, false );

};

SWEEP.Button.prototype = {

	constructor: SWEEP.Button,

	setGeometry: function ( x, y, height, padding ) {

		this.text.style.fontSize = height*0.5 + 'px';
		var width = this.text.offsetWidth || this.text.getBBox().width;

		this.text.setAttribute( 'x', x+padding );
		this.text.setAttribute( 'y', y+height*0.68 );

		this.rect.setAttribute( 'x', x );
		this.rect.setAttribute( 'y', y );
		this.rect.setAttribute( 'width', width+2*padding );
		this.rect.setAttribute( 'height', height );

		return width+2*padding;

	}

};

