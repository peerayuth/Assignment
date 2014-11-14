var Hapi 	 = require('hapi');
var Path 	 = require('path');
var Joi 	 = require('joi');
var Server 	 = new Hapi.Server(3000);
var Mongoose = require('mongoose');
var Member 	 = require('./model/member.js');
Mongoose.connect('mongodb://localhost/test', function(err){
	if (err) {
		console.log('Connection Error!' + err);
	}
});

Server.views({
	engines:{
		html: require('handlebars')
	},
	path: Path.join(__dirname, 'view')
});

Server.route({
	method: 'GET',
	path: 	'/{param*}',
	handler: {
		directory: {
			path: 	'public',
			listing: true
		}
	}
})

Server.route({
	method: 'GET',
	path: 	'/',
	handler: function(request, reply) {
		reply.view('index');
	}
});

Server.route({
	method: 'GET',
	path: 	'/register',
	handler: function(request, reply) {
		reply.view('form');
	}
});


Server.route({
	method: 'GET',
	path: 	'/confirm',
	handler: function(request, reply) {
		reply.view('confirm');
	}
});


Server.route({
	method: 'POST',
	path: 	'/profile',

	config :{
		handler: function(request, reply) {
			var mem = {
				firstName:request.payload.InputFirstName,
				lastName:request.payload.InputLastName,
				address:request.payload.InputTextAddress,
				gender:request.payload.InputGender,
				ageRange:request.payload.InputAgeRange,
				confirm:request.payload.InputCheckbox || 0
			};
			// keep model

			var memObj = new Member(mem);
			memObj.save(function(err){
				if(err) {
					reply(err); console.log(err);
				}
				else {
					reply.view('confirm',{
						viewMem: memObj
					});
					//reply(memObj);
				}
			});
			// insert database
		},

		validate:{
			payload:{
				InputFirstName:Joi.string().required(),
				InputLastName:Joi.string().required(),
				InputTextAddress:Joi.string().allow(''),
				InputGender:Joi.string().allow(''),
				InputAgeRange:Joi.string().allow(''),
				InputCheckbox:Joi.number().required()
			}
		}
		//validate data
	}
});






















Server.start (function() {
	console.log('Server running at:', Server.info.uri);
});