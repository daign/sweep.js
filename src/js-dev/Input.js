SWEEP.Input = function () {

	var addPoint = function ( x, y, line ) {

		var point = new SWEEP.Point( x, y, false );
		point.addLine( line );
		point.draw();
		SWEEP.points.insert( point );
		return point;

	};

	var addLine = function ( x1, y1, x2, y2 ) {

		var line = new SWEEP.Line();
		var point1 = addPoint( x1, y1, line );
		var point2 = addPoint( x2, y2, line );
		line.setPoints( point1, point2 );

	};

	addLine( 90, 40, 15, 65 );
	addLine( 74, 36, 40, 70 );
	addLine( 40, 30, 74, 64 );
	addLine( 15, 35, 90, 60 );
	addLine( 10, 28, 25, 72 );
	addLine( 93, 45, 70, 80 );
	addLine( 60, 32, 60, 68 );

};

