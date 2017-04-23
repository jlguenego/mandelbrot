'use strict';

import Complex from './Complex.js';
import Suite from './Suite.js';
import Timer from './Timer.js';

import 'jquery';
import 'angular';

var app = angular.module('main', []);
app.run(function($rootScope, $window, $document) {
	'ngInject';

	function onresize() {
		console.log('onresize', arguments);
		var width = $(window).width();
		var height = $(window).height() - 150;
		var s = {
			xStart: -2.2,
			xEnd: 0.8,
			width: width,
			height: height,
			step: 400,
			max: 50
		};
		s.xWidth = s.xEnd - s.xStart;
		s.yStart = -0.5 * s.xWidth * s.height / s.width;
		s.yEnd = 0.5 * s.xWidth * s.height / s.width;
		s.yHeight = s.yEnd - s.yStart;

		$rootScope.s = s;
		console.log('$rootScope.s', $rootScope.s.width);
		$rootScope.$apply();
	};

	$window.onresize = onresize;
	onresize();


	$('canvas').bind('mousewheel', function(e) {
		e.preventDefault();
		console.log('wheel event', arguments);
		var s = $rootScope.s;
		if (e.originalEvent.wheelDelta / 120 > 0) {
			console.log('wheel event up: zoom out', e.offsetX, e.offsetY);
			zoom(s, e, -1);
		} else {
			console.log('wheel event down: zoom in');
			zoom(s, e, 1);
		}
		$rootScope.$apply();
	});

	var startX = 0;
	var startY = 0;
	var x = 0;
	var y = 0;

	$('canvas').on('mousedown', function(event) {
		console.log('mousedown');
		event.preventDefault();
		startX = event.pageX;
		startY = event.pageY;

		$document.on('mousemove', mousemove);
		$document.on('mouseup', mouseup);
	});

	function mousemove(event) {
		y = event.pageY - startY;
		x = event.pageX - startX;
	}

	function mouseup() {
		console.log('mouseup');
		$document.off('mousemove', mousemove);
		$document.off('mouseup', mouseup);
		move($rootScope.s, x, y);
		console.log('$rootScope', $rootScope);
		$rootScope.$apply();
	}

	$rootScope.$watch('s', function() {
		console.log('watch s', $rootScope.s);
		main($rootScope.s);
	}, true);

});



angular.element(() => {
	angular.bootstrap(document, ['main']);
});



function main(s) {
	console.log('width', s.width);
	console.log('height', s.height);
	var c = document.getElementById('myCanvas');
	c.width = s.width;
	c.height = s.height;
	var ctx = c.getContext('2d');
	ctx.clearRect(0, 0, c.width, c.height);

	var xStep = s.step;
	var yStep = s.step;

	function scaleX(x) {
		return Math.ceil((x - s.xStart) * s.width / s.xWidth);
	}

	function scaleY(y) {
		return Math.ceil((y - s.yStart) * s.height / s.yHeight);
	}

	var pixelX = Math.ceil(s.width / xStep);
	var pixelY = Math.ceil(s.height / yStep);

	var t = new Timer();

	for (var i = 0; i < xStep; i++) {
		for (var j = 0; j < yStep; j++) {

			var x = s.xStart + i * (s.xWidth) / xStep;
			var y = s.yStart + j * (s.yHeight) / yStep;
			var z = new Complex(x, y);
			var suite = new Suite(z, s.max);
			var type = suite.getType();

			var color;
			if (type === -1) {
				color = 'black';
			} else {
				color = 'hsla(' + Math.ceil(type * 360 / s.max) + ', 100%, 50%, 1)';
			}
			ctx.fillStyle = color;

			ctx.fillRect(scaleX(x), scaleY(y), pixelX, pixelY);
			ctx.stroke();
			// console.log('done for', i, j, x, y, scaleX(x), scaleY(y), color);
		}

	}
	ctx.stroke();
	console.log('canva done', t.getTime());
};

function zoom(s, e, coef) {

	var c;
	if (coef === -1) {
		c = 0.5;
	} else {
		c = 2;
	}
	var xR = e.offsetX / s.width;
	var yR = e.offsetY / s.height;
	var x = s.xStart + xR * s.xWidth;
	var y = s.yStart + yR * s.yHeight;

	s.xWidth *= c;
	s.yHeight *= c;

	s.xStart = x - xR * s.xWidth;
	s.yStart = y - yR * s.yHeight;

	s.xEnd = s.xStart + s.xWidth;
	s.yEnd = s.yStart + s.yHeight;

}

function move(s, x, y) {
	console.log('move', arguments);
	s.xStart -= x * s.xWidth / s.width;
	s.yStart -= y * s.yHeight / s.height;

	s.xEnd = s.xStart + s.xWidth;
	s.yEnd = s.yStart + s.yHeight;

}
