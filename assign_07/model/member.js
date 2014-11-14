var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var memberSchema = new Schema({
	firstName	: { type : String},
	lastName	: { type : String},
	address		: { type : String},
	gender		: { type : String},
	ageRange	: { type : String},
	confirm		: { type : Number}			
});

module.exports = Mongoose.model('memberprofiles', memberSchema);

