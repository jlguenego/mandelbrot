'use strict';

import Complex from './Complex.js';
import Suite from './Suite.js';

import 'jquery';
import 'angular';

var app = angular.module('main', []);
app.run(function($rootScope) {
	'ngInject';
	$rootScope.width = $(window).width();
	$rootScope.height = $(window).height() - $('h1').height();
	$rootScope.step = 600;
	$rootScope.max = 50;
	setTimeout(() => {
		main($rootScope);
	}, 0);

});

angular.element(() => {
	angular.bootstrap(document, ['main']);
});



function main($rootScope) {
	var width = $rootScope.width;
	var height = $rootScope.height;
	var step = $rootScope.step;
	var max = $rootScope.max;

	console.log('width', width);
	console.log('height', height);
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');
	c.width = width;
	c.height = height;

	var xStart = -2;
	var xEnd = 2;
	var xStep = step;

	var xWidth = xEnd - xStart;

	var yCenter = 0;
	var yStart = yCenter - 0.5 * xWidth * height / width;
	var yEnd = yCenter + 0.5 * xWidth * height / width;
	var yStep = step;


	var yHeight = yEnd - yStart;

	function scaleX(x) {
		return Math.ceil((x - xStart) * width / xWidth);
	}

	function scaleY(y) {
		return Math.ceil((y - yStart) * height / yHeight);
	}

	var pixelX = Math.ceil(width / xStep);
	var pixelY = Math.ceil(height / yStep);

	for (var i = 0; i < xStep; i++) {
		for (var j = 0; j < yStep; j++) {

			var x = xStart + i * (xEnd - xStart) / xStep;
			var y = yStart + j * (yEnd - yStart) / yStep;
			var z = new Complex(x, y);
			var suite = new Suite(z, max);
			var type = suite.getType();

			var color = 'white';
			if (type === -1) {
				color = 'black';
			} else {
				color = 'hsla(' + Math.ceil(type * 360/max) + ', 100%, 50%, 1)';
			}
			ctx.fillStyle = color;

			ctx.fillRect(scaleX(x), scaleY(y), pixelX, pixelY);
			// console.log('done for', i, j, x, y, scaleX(x), scaleY(y), color);
		}

	}
	ctx.stroke();
	console.log('canva done');
};
