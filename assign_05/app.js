var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var parseString = require('xml2js').parseString;


var xmlFile  = argv.f;
var jsonFile = argv.o;

fs.readFile(xmlFile, function(err, data){
	//console.log(data.toString());
	if (err) throw(err);
	parseString(data, function (err, result) {
    	//console.dir(JSON.stringify(result));
    	fs.writeFile(jsonFile, JSON.stringify(result));
    	console.log("Transform XML to JSON success!");
	});

});


//var xml = "<root>Hello xml2js!</root>"

//fs.readFile('input.xml','utf8', function(err,data){
//	console.log(data);
//});