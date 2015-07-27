angular.module("puissance4")
.controller("UsersController", function($location, UsersService, GamesService) {
	"use strict";

	var usersCtl = this;

	usersCtl.users = [];
	usersCtl.loggedUsers = [0, 0];
	usersCtl.historyOfGames = [];

	UsersService.getAll().then(function (users) {
		usersCtl.users = users;
	});

	GamesService.getAll().then(function (games) {
		usersCtl.games = games;
	});

	function retrievePlayedGames() {
		GamesService.getGamesFrom(usersCtl.loggedUsers[0].id, usersCtl.loggedUsers[1].id).then(function(games) {
			usersCtl.historyOfGames = games;
		});
	}

	usersCtl.validateNewUser = function(form) {
		if (form.$invalid) {
			return;
		}

		UsersService.addUser(usersCtl.newuser);

		usersCtl.users.push(angular.copy(usersCtl.newuser));
		usersCtl.newuser = null;
	};

	usersCtl.setTableSort = function(tableSort) {
		if (tableSort === usersCtl.tableSort) {
			usersCtl.tableSort = '-' + usersCtl.tableSort;
		} else {
			usersCtl.tri = tableSort;
		}
	};

	usersCtl.checkLoginForm = function(formData, idx) {
		var u = usersCtl.users.find(function(u) {
			return formData.user.name === u.name;
		});
		if (!u) {
			UsersService.addUser(formData.user).then(function(user) {
				usersCtl.loggedUsers[idx] = user;
			}).then(function() {
				retrievePlayedGames();
			});
		}
		else
		{
				usersCtl.loggedUsers[idx] = u;
				retrievePlayedGames();
		}
	};

	usersCtl.createGame = function(u1, u2) {
		var game = {
			user1: u1,
			user2: u2,
			history: []
		};

		GamesService.createGame(game).then(function(game) {
			$location.path( "/game/" + game.id );
		});
	};
});
