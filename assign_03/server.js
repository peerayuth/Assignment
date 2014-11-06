var Hapi = require('hapi');
var Path = require('path');
var server = new Hapi.Server(3000);

server.views({
	engines:{
		html: require('handlebars')
	},
	path: Path.join(__dirname, 'view')
});

server.route({
	method: 'GET',
	path: 	'/{param*}',
	handler: {
		directory: {
			path: 	'public',
			listing: true
		}
	}
});

server.route({
	method: 'GET',
	path: 	'/',
	handler: function(request, reply) {
		reply.view('index');
	}
});

var dessert = [
	{ type:"Chocolate Cake", picture: "images01.jpg", prize:50, material:"chocolate"},
	{ type:"Strawberry Roll", picture: "images02.jpg", prize:45, material:"strawberry"},
	{ type:"Chocolate Cake", picture: "images03.jpg", prize:50, material:"chocolate"},
	{ type:"Strawberry Roll", picture: "images04.jpg", prize:45, material:"vanila"}
];

server.route({
	method: 'GET',
	path: 	'/dessert',
	handler: function(request, reply) {
		reply(dessert);
	}
});

server.start (function() {
	console.log('Server running at:', server.info.uri);
});