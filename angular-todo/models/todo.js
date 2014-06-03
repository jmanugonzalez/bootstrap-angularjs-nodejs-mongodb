var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
	text : String
});

module.exports = mongoose.model('Todo', Todo);