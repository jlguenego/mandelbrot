'use strict';

export default class Timer {

	constructor() {
		this.t = new Date();
	}


	getTime() {
		var now = new Date();
		var sec = now.getTime() - this.t.getTime();
		return sec;
	}

};
