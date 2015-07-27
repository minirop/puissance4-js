angular.module("puissance4")
.directive("grovatar", function() {
	return {
		restrict: 'E',
		template: '<img src="http://www.gravatar.com/avatar/{{ grovatar.md5(grovatar.email) }}?s={{ grovatar.size }}">',
		bindToController: {
			email: "=",
			size: "@"
		},
		scope: {},
		controller: "GrovatarController",
		controllerAs: "grovatar"
	};
})
.controller("GrovatarController", function() {
	"use strict";

	var grovatar = this;

	grovatar.md5 = function(str) {
		return md5(str);
	};
})
;
