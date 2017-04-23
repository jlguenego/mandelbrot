'use strict';

import Complex from './Complex.js';

export default class Suite {

	constructor(z, max) {
		this.z = z;
		this.max = max;
		this.current = new Complex(0, 0);
	}

	increment() {
		this.current = Complex.add(this.z, Complex.multiply(this.current, this.current));
	}

	getType() {
		for (var i = 0; i < this.max; i++) {
			this.increment();
			if (this.current.module2() > 4) {
				return i;
			}

		}
		return -1;
	}

};
