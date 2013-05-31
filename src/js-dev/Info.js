SWEEP.Info = {

	visible: true,

	init: function () {

		this.group = document.createElementNS( SWEEP.SVGNS, 'g' );
		SWEEP.SVG.append( this.group, 'gui' );

		this.background = document.createElementNS( SWEEP.SVGNS, 'rect' );
		this.background.setAttribute( 'x', 10 );
		this.background.setAttribute( 'y', 10 );
		this.background.setAttribute( 'rx', 10 );
		this.background.setAttribute( 'ry', 10 );
		this.background.setAttribute( 'class', 'guiabout' );
		this.group.appendChild( this.background );

		this.info = document.createElementNS( SWEEP.SVGNS, 'use' );
		this.info.setAttributeNS( SWEEP.XLink, 'href', '#info' );
		this.group.appendChild( this.info );

	},

	setDimensions: function ( width, height ) {

		this.background.setAttribute( 'width',  Math.max( 0, width-20 ) );
		this.background.setAttribute( 'height', Math.max( 0, height-20 ) );
		var boxWidth = Math.min( width, height ) - 40;
		var scale = Math.max( 0.01, boxWidth / 100 );
		var x = ( width  - boxWidth ) / ( 2 * scale );
		var y = ( height - boxWidth ) / ( 2 * scale );
		this.info.setAttribute( 'transform', 'scale(' + scale + ') translate(' + x + ',' + y + ')' );

	},

	setVisibility: function ( b ) {

		this.visible = b;
		this.group.style.visibility = b ? 'visible' : 'hidden';

	},

	toggleVisibility: function () {

		this.setVisibility( !this.visible );

	}

};

