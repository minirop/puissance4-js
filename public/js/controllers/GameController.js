angular.module("puissance4")
.controller("GameController", function($routeParams, UsersService, GamesService) {
	"use strict";

	var gameCtl = this;

	gameCtl.playingUsers = [];

	gameCtl.plateau = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];

	gameCtl.loadGame = function() {
		gameCtl.game_id = $routeParams.id;

		GamesService.getById(gameCtl.game_id).then(function(game) {
			console.log(game);
			UsersService.getById(game.user1).then(function(user) {
				gameCtl.playingUsers.push(user);
				return UsersService.getById(game.user2);
			}).then(function(user) {
				gameCtl.playingUsers.push(user);
			});

			replay_board(game.history);
		});
	};

	function replay_board(coups) {
		gameCtl.plateau = [
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0]
		];

		if (coups)
		{
			var player = 0;
			coups.forEach(function(col) {
				play(gameCtl.plateau, player + 1, col);
				player = (player + 1) % 2;
			});
			gameCtl.currentPlayer = player;
		}
	}

	function play(board, player, col) {

		if (col < 0 || col > 6) return false;
		if (board[col][5] !== 0) return false;

		for (var i = 0;i < 6;i++) {
			if (board[col][i] === 0) {
				board[col][i] = player;
				i = 99;
			}
		}

		return true;
	}

	function checkWinner(board, col) {
		function isWinner(array, player) {
			if (array.length < 4) return false;

			var cnt = 0;
			var iswinnerResult = false;

			array.forEach (function(z) {
				if (z == player) {
					cnt++;
					if(cnt === 4) iswinnerResult = true;
				}
				else
				{
					cnt = 0;
				}
			});

			return iswinnerResult;
		}

		var row = board[col].indexOf(0);
		if (row < 0) row = 5; else row--;
		
		var last_player = board[col][row];

		var c1 = Math.max(0, col - 3);
		var c2 = Math.min(6, col + 3);
		var r1 = Math.max(0, row - 3);
		var r2 = Math.min(5, row + 3);
		var cc, rr;

		var lineArray = [];
		var diag1Array = [];
		var diag2Array = [];

		if (isWinner(board[col], last_player)) {
			return last_player;
		}

		for (cc = c1;cc <= c2;cc++) {
			lineArray.push(board[cc][row]);
		}

		if (isWinner(lineArray, last_player)) {
			return last_player;
		}

		for (rr = r1, cc = c1;rr <= r2 && cc <= c2;rr++, cc++) {
			if (rr < 0 || cc < 0) continue;

			diag1Array.push(board[cc][rr]);
		}

		if (isWinner(diag1Array, last_player)) {
			return last_player;
		}

		for (rr = r2, cc = c1;rr >= r1 && cc <= c2;rr--, cc++) {
			if (rr > 5 || cc < 0) continue;
			
			diag2Array.push(board[cc][rr]);
		}

		if (isWinner(diag2Array, last_player)) {
			return last_player;
		}

		return 0;
	}

	gameCtl.currentPlayer = 0;
	gameCtl.game_id = 0;

	gameCtl.winner = 0;

	gameCtl.playInColumn = function(col) {
		play(gameCtl.plateau, gameCtl.currentPlayer + 1, col);

		gameCtl.winner = checkWinner(gameCtl.plateau, col);

		gameCtl.currentPlayer = (gameCtl.currentPlayer + 1) % 2;

		// updateGame({
		// 	id: gameCtl.game_id,
		// 	user1: 0
		// });
	};

});
