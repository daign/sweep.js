SWEEP.Input = function () {

	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();
	addRandomLine();

	function addRandomLine() {
		new SWEEP.Line(
			Math.random() * SWEEP.SVG.w,
			Math.random() * SWEEP.SVG.h,
			Math.random() * SWEEP.SVG.w,
			Math.random() * SWEEP.SVG.h
		);
	};

};

