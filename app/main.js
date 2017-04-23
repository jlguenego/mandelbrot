'use strict';

import Complex from './Complex.js';
import Suite from './Suite.js';

import 'jquery';
import 'angular';

var app = angular.module('main', []);
app.run(function($rootScope) {
	'ngInject';
	var s = {
		xStart: -2,
		xEnd: 2,
		yCenter: 0,
		width: $(window).width(),
		height: $(window).height() - 100,
		step: 400,
		max: 50
	};
	s.xWidth = s.xEnd - s.xStart;
	s.yStart = s.yCenter - 0.5 * s.xWidth * s.height / s.width;
	s.yEnd = s.yCenter + 0.5 * s.xWidth * s.height / s.width;
	s.yHeight = s.yEnd - s.yStart;

	console.log('$(h1).height()', $('h1').height());
	$rootScope.s = s;
	console.log('$rootScope.s', $rootScope.s.width);
	setTimeout(() => {
		main(s);
	}, 0);

	$('canvas').bind('mousewheel', function(e) {
		e.preventDefault();
		console.log('wheel event', arguments);
		if (e.originalEvent.wheelDelta / 120 > 0) {
			console.log('wheel event up: zoom out', e.offsetX, e.offsetY);
			zoom(s, e, 1);
		} else {
			console.log('wheel event down: zoom in');
			zoom(s, e, -1);
		}
		main(s);

	});

	$rootScope.$watch('s', function() {
		main(s);
	}, true);

});

angular.element(() => {
	angular.bootstrap(document, ['main']);
});



function main(s) {
	console.log('width', s.width);
	console.log('height', s.height);
	var c = document.getElementById('myCanvas');
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

	for (var i = 0; i < xStep; i++) {
		for (var j = 0; j < yStep; j++) {

			var x = s.xStart + i * (s.xEnd - s.xStart) / xStep;
			var y = s.yStart + j * (s.yEnd - s.yStart) / yStep;
			var z = new Complex(x, y);
			var suite = new Suite(z, s.max);
			var type = suite.getType();

			var color = 'white';
			if (type === -1) {
				color = 'black';
			} else {
				color = 'hsla(' + Math.ceil(type * 360 / s.max) + ', 100%, 50%, 1)';
			}
			ctx.fillStyle = color;

			ctx.fillRect(scaleX(x), scaleY(y), pixelX, pixelY);
			// console.log('done for', i, j, x, y, scaleX(x), scaleY(y), color);
		}

	}
	ctx.stroke();
	console.log('canva done');
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
