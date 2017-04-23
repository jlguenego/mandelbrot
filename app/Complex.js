'use strict';

export default class Complex {
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
	module2() {
		return this.x * this.x + this.y * this.y;
	}
}
