var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {

	var filePath = req.url;
	if (filePath == '/')
		filePath = '/roadmap.html';

	filePath = __dirname+filePath;
	var extname = path.extname(filePath);
	var contentType = 'text/html';

	switch (extname) {
		case '.js':
		contentType = 'text/javascript';
		break;
		case '.css':
		contentType = 'text/css';
		break;
	}

	//Open a file on the server and return its content:
	fs.readFile(filePath, function(err, data) {
		res.writeHead(200, {'Content-Type': contentType});
		res.write(data);
		return res.end();
	});
}).listen(8080);
