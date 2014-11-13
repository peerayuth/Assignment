var http = require('http');
var fs = require('fs');

htp.createServer(function(req,res){
	fs.readFile('helloworld.js','utf8',function(err, data){
		res.writeHead(200, {'Content-type':'text/plain'});
		if(err)
			res.write('Could not find or open file for reading\n');
		else
			res.write(data);
		res.end();
	});
}).listen(8000) function(){
	console.log('bound to port 8000');
});
console.log('server running on 8000');

