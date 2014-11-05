var http = require('http');

http.createServer( function(req,res){
		res.end("Assignment I");
	}
).listen(3000);

console.log("Server running at port:3000.");