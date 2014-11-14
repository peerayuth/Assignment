var fs = require('fs');
var _ = require('lodash');
var mysql = require('mysql');
var parseString = require('xml2js').parseString;
var stdio = require('stdio');
var util = require('util');
var ops = stdio.getopt({
    'file' : {key: 'f', args: 1, description: 'file XML', mandatory: true},
    'spilt': {key: 's', args: 1, description: 'description', mandatory: true},
    'db'   : {key: 'd', args: 1, description: 'description', mandatory: true},
    'table': {key: 't', args: 1, description: 'description', mandatory: true}
});

var file 	= ops.file,
 	spilt	= ops.spilt,
 	db		= ops.db,
 	table 	= ops.table;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '1111'
});

connection.connect();

fs.readFile(file,'utf8',function(err, data){
	if (err) throw(err);
	parseString(data,{explicitArray:false}, function(err, result){
		//console.log(JSON.stringify(result));
		if (!result.doc[spilt]){
			throw 'Failed to parse xml.';
		}
		var keys = _.keys(result.doc[spilt][0]);
		/*_.each(data, function(item){
			//console.log(item);
			_.each(keys, function(key){
				console.log(item[key]);
			});
		});*/

		connection.query('CREATE DATABASE IF NOT EXISTS '+ db, function(err, rows) {
		  	if (err) throw err;

	  		connection.query('USE '+ db, function(err, rows) {
			  	if (err) throw err;

			  	var fields = _.map(keys, function(key){
			  		return util.format('%s varchar(255)', key);
			  	});

			  	var query = util.format('CREATE TABLE IF NOT EXISTS %s (%s);', table, fields.join(', '));

				connection.query(query, function(err, rows) {
					if (err) throw err;

					var query = util.format("INSERT INTO %s (%s) VALUES ", table, keys.join(', '));

					var text = _.map(result.doc[spilt], function (record) {
						var values = [];
						_.each(keys, function(key) {
							values.push(util.format("'%s' ", record[key]));
						});
						return "(" + values.join(", ") + ")";
					});

					query = query.concat(text.join(', '), ";");
					connection.query(query, function (err, rows) {
						if (err) throw err;

						connection.end();
					});
				});
			});
		});


	});
});




//connection.end();