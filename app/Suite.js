'use strict';

import Complex from './Complex.js';

export default class Suite {

	constructor(z) {
		this.z = z;
		this.current = new Complex(0, 0);
	}

	increment() {
		this.current = Complex.add(this.z, Complex.multiply(this.current, this.current));
	}

	getColor() {
		var max = 20;
		for (var i = 0; i < max; i++) {
			this.increment();
			if (this.current.module() > 2) {
				return 0;
			}

		}
		return 1;
	}

}

