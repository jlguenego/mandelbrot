'use strict';

import Complex from './Complex.js';
import Suite from './Suite.js';

var width = 400;
var height = 400;

var step = 400;

function main() {
	var c = document.getElementById('myCanvas');
	var ctx = c.getContext('2d');

	var xStart = -2;
	var xEnd = 2;
	var xStep = step;

	var yStart = -2;
	var yEnd = 2;
	var yStep = step;

	function scaleX(x) {
		return (x - xStart) * width / (xEnd - xStart);
	}

	function scaleY(y) {
		return (y - yStart) * width / (yEnd - yStart);
	}
	var pixelX = width / xStep;
	var pixelY = height / yStep;

	for (var i = 0; i < xStep; i++) {
		for (var j = 0; j < yStep; j++) {

			var x = xStart + i * (xEnd - xStart) / xStep;
			var y = yStart + j * (yEnd - yStart) / yStep;
			var z = new Complex(x, y);
			var suite = new Suite(z);
			var luminosity = suite.getColor();

			var color = 'blue';
			if (luminosity) {
				color = 'blue';
			} else {
				color = 'red';
			}
			ctx.fillStyle = color;

			ctx.fillRect(scaleX(x), scaleY(y), pixelX, pixelY);
			//console.log('done for', i, j, x, y, scaleX(x), scaleY(y), color);
		}

	}
	ctx.stroke();
};


main();
