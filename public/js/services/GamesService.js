angular.module("puissance4")
.factory("GamesService", function($http) {
	"use strict";
	return {
		version: "1.0",

		getAll: function() {
			return $http.get('/games').then(function(response) {
				return response.data;
			});
		},

		getGamesFrom: function(u1, u2) {
			return this.getAll().then(function(games) {
				return games.filter(function(g) {
					return (g.user1 === u1 && g.user2 === u2) ||
							(g.user1 === u2 && g.user2 === u1);
				});
			});
		},

		getById: function(id) {
			return $http.get('/games/' + id).then(function(response) {
				return response.data;
			});
		},

		updateGame: function(game) {
			return $http.put('/games/' + game.id, game);
		},

		createGame: function(game) {
			return $http.post('/games', game).then(function(response) {
				return response.data;
			});
		}
	};
});
