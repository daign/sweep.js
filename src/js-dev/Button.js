SWEEP.Button = function ( text, action ) {

	this.div = document.createElement( 'div' );
	this.div.innerHTML = '<br/>' + text;
	this.div.setAttribute( 'class', 'button' );
	this.div.style.position = 'absolute';
	this.div.style.bottom = '0px';
	document.body.appendChild( this.div );

	function onclick() {
		if ( SWEEP.sweepActive ) { return; }
		action();
	}

	this.div.addEventListener( 'click', onclick, false );

};

SWEEP.Button.prototype = {

	constructor: SWEEP.Button,

	setGeometry: function ( left ) {
		this.div.style.left = left + 'px';
	}

};

