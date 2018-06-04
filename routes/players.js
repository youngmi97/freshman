
var express = require('express');
var router1 = express.Router();
var Player = require('../models/stat');
var assert = require('assert');

const MongoClient = require('mongodb').MongoClient;
//NEW SHIT
var mongoose = require('mongoose');

var url = 'mongodb://localhost/loginapp';



router1.get('/upload', function (req, res) {
	res.render('upload');
});






router1.get('/upload/stat_upload', function (req, res) {
	res.render('stat_upload');
});





router1.get('/lookup/orangeleague_lookup', function(req, res) {
	var resultArray =[];
	MongoClient.connect(url, function(err, database) {

		assert.equal(null, err);

		const cursor = database.db('loginapp').collection('players').find();
		cursor.forEach( function(doc, err) {
			resultArray.push(doc);
		});

		database.close();
		console.log(resultArray);
		res.render('orangeleague_lookup', {items: resultArray});
	});
});




/*
router1.post('/upload/stat_upload', function (req, res) {
	res.send({type:'POST'});
});
*/


router1.put('/upload/stat_upload', function(req, res) {
	res.send({type:'PUT'}); 
});








router1.post('/upload/stat_upload', function (req, res) {
	var date = req.body.date;
	var game = req.body.game;
	var name = req.body.name;
	var points = req.body.points;
	var rebounds = req.body.rebounds;
	var assists = req.body.assists;
	var steals = req.body.steals;
	var blocks = req.body.blocks;
	var turnovers = req.body.turnovers;
	var fouls = req.body.fouls;



	req.checkBody('date', 'Date is required').notEmpty();
	req.checkBody('game', 'Game is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('points', 'Points is required').notEmpty();
	req.checkBody('rebounds', 'Rebounds is required').notEmpty();
	req.checkBody('assists', 'Assists is required').notEmpty();
	req.checkBody('steals', 'Steals is required').notEmpty();
	req.checkBody('blocks', 'Blocks is required').notEmpty();
	req.checkBody('turnovers', 'TOs is required').notEmpty();
	req.checkBody('fouls', 'Fouls is required').notEmpty();

	var errors = req.validationErrors();

	if (errors) {
		res.render('stat_upload', {
			errors: errors
		});
		req.flash('error_msg', 'Empty Fields!')
	}

	else {
		var newPlayer = new Player ({
		date: date,
		game: game,
		name: name,
		points: points,
		rebounds: rebounds,
		assists: assists,
		steals: steals,
		blocks: blocks,
		turnovers: turnovers,
		fouls: fouls
		});

		Player.createPlayer(newPlayer, function (err, player) {
		if (err) throw err;
		console.log(player);
		});
		req.flash('success_msg', 'You have created a new entree for a player')
		res.redirect('/users/upload/stat_upload')
	}
});






module.exports = router1;





