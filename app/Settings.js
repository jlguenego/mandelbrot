'use strict';

export default class Settings {

	constructor() {
		var width = $(window).width();
		var height = $(window).height() - 150;
		this.xStart = -2.2;
		this.xEnd = 0.8;
		this.width = width;
		this.height = height;
		this.step = 400;
		this.max = 50;

		this.xWidth = this.xEnd - this.xStart;
		this.yStart = -0.5 * this.xWidth * this.height / this.width;
		this.yEnd = 0.5 * this.xWidth * this.height / this.width;
		this.yHeight = this.yEnd - this.yStart;
	}


	incMax() {
		this.max *= 1.5;
	}

	decMax() {
		this.max /= 1.5;
	}
};
