(function() {
	'use strict';

	var width = 400;
	var height = 400;

	function main() {
		var c = document.getElementById('myCanvas');
		var ctx = c.getContext('2d');

		var xStart = -2;
		var xEnd = 2;
		var xStep = 10;

		var yStart = -2;
		var yEnd = 2;
		var yStep = 10;

		function scaleX(x) {
			return (x + 2) * 250;
		}

		function scaleY(y) {
			return (y + 2) * 250;
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
				console.log('done for', i, j, x, y, scaleX(x), scaleY(y), color);
			}

		}
		ctx.stroke();
	};

	class Complex {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
		static add(u, v) {
			return new Complex(u.x + v.x, u.y + v.y);
		}
		static multiply(u, v) {
			return new Complex(u.x * v.x - u.y * v.y, u.x * v.y + u.y * v.x);
		}
		module() {
			return this.x * this.x + this.y * this.y;
		}
	}

	class Suite {

		constructor(z) {
			this.z = z;
			this.index = 0;
			this.current = new Complex(0, 0);
		}

		increment() {
			this.current = Complex.add(this.z, Complex.multiply(this.current, this.current));
		}

		getColor() {
			var max = 200;
			for (var i = 0; i < max; i++) {
				this.increment();
				if (this.current.module() > 2) {
					return 0;
				}
				return 1;
			}
		}

	}


	main();

})();
