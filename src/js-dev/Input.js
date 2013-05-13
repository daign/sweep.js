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

	addLine( 29, 42, 70, 10 );
	addLine( 70, 70, 40, 22 );
	addLine( 85, 60, 20, 80 );
	addLine( 10, 32, 60, 90 );
	addLine( 25, 95, 65, 4 );
	addLine( 12, 14, 22, 26 );
	addLine( 79, 7, 93, 55 );
	addLine( 67, 53, 97, 44 );

};

