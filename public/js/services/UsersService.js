angular.module("puissance4")
.factory("UsersService", function($http) {
	"use strict";
	return {
		version: "1.0",

		getAll: function() {
			return $http.get('/users').then(function(response) {
				return response.data;
			});
		},

		addUser: function(user) {
			return $http.post('/users', user).then(function(response) {
				return response.data;
			});
		},

		getById: function(id) {
			return $http.get('/users/' + id).then(function(response) {
				return response.data;
			});
		}
	};
});
