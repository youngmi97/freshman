var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
	date: {
		type: String
	},

	game: {
		type: String
	},
	name: {
		type: String
	},
	points: {
		type: Number
	},
	rebounds: {
		type: Number
	},
	assists: {
		type:  Number
	},
	steals: {
		type: Number
	},
	blocks: {
		type: Number
	},
	turnovers: {
		type: Number
	},
	fouls: {
		type: Number
	}

});


module.exports = mongoose.model('Player', PlayerSchema);

module.exports.createPlayer = function(newPlayer, callback) {
	newPlayer.save(callback);
};





