SWEEP.Animation = function ( start, target, duration, callback, finish ) {

	var speed = 1;

	var animation = new TWEEN.Tween( start ).to( target, duration*speed );
	animation.onUpdate( callback );
	animation.onComplete( finish );
	animation.start();

};

