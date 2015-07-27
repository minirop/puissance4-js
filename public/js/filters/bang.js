angular.module("puissance4")
.filter("bang", function() {
	"use strict";
	return function(input, c, n) {
		c = c || '!';
		n = n || 1;

		if (n < 0) n = 1;
		input += " " + c.repeat(n);
		
		return input;
	};
});
