SWEEP.Input = function () {

	var self = this;

	this.point1 = document.createElementNS( SWEEP.SVGNS, 'circle' );
	this.point1.setAttribute( 'r', 6 );
	this.point1.setAttribute( 'fill', 'red' );
	this.point1.style.visibility = 'hidden';
	SWEEP.SVG.append( this.point1, 'gui' );

	this.point2 = document.createElementNS( SWEEP.SVGNS, 'circle' );
	this.point2.setAttribute( 'r', 6 );
	this.point2.setAttribute( 'fill', 'red' );
	this.point2.style.visibility = 'hidden';
	SWEEP.SVG.append( this.point2, 'gui' );

	this.line = document.createElementNS( SWEEP.SVGNS, 'line' );
	this.line.setAttribute( 'fill', 'none' );
	this.line.setAttribute( 'stroke', 'red' );
	this.line.setAttribute( 'stroke-width', '4px' );
	this.line.style.visibility = 'hidden';
	SWEEP.SVG.append( this.line, 'gui' );

	document.addEventListener( 'mousedown', beginDraw, false );

	function beginDraw( event ) {

		if ( SWEEP.sweepActive ) { return; }
		if ( event.clientY > SWEEP.SVG.drawingAreaHeight ) { return };

		event.preventDefault();
		event.stopPropagation();

		var x1 = event.clientX;
		var y1 = event.clientY;
		var x2 = event.clientX;
		var y2 = event.clientY;
		self.point1.setAttribute( 'cx', x1 );
		self.point1.setAttribute( 'cy', y1 );
		self.point1.style.visibility = 'visible';
		self.point2.setAttribute( 'cx', x2 );
		self.point2.setAttribute( 'cy', y2 );
		self.point2.style.visibility = 'visible';
		self.line.setAttribute( 'x1', x1 );
		self.line.setAttribute( 'y1', y1 );
		self.line.setAttribute( 'x2', x2 );
		self.line.setAttribute( 'y2', y2 );
		self.line.style.visibility = 'visible';

		document.addEventListener( 'mousemove', continueDraw, false );
		document.addEventListener( 'mouseup',   endDraw,      false );

		function continueDraw( event ) {

			x2 = event.clientX;
			y2 = event.clientY;
			self.point2.setAttribute( 'cx', x2 );
			self.point2.setAttribute( 'cy', y2 );
			self.line.setAttribute( 'x2', x2 );
			self.line.setAttribute( 'y2', y2 );

		}

		function endDraw() {

			self.point1.style.visibility = 'hidden';
			self.point2.style.visibility = 'hidden';
			self.line.style.visibility = 'hidden';

			if ( y2 <= SWEEP.SVG.drawingAreaHeight ) {
				new SWEEP.Line( x1, y1, x2, y2 );
			}

			document.removeEventListener( 'mousemove', continueDraw, false );
			document.removeEventListener( 'mouseup',   endDraw,      false );

		}

	}

};

