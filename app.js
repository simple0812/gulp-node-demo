var express = require('express');
var app = express();
var http = require('http');

var bodyParser = require('body-parser');
var ejs = require('ejs');
var engine = require('ejs-locals');
var config = require('./config');
var logger = require('./utils/logger');

app.set('views', "" + __dirname + "/views");
app.set('view engine', 'html');
app.engine('html', engine);

app.use(bodyParser.urlencoded({
	extended: false
}));
app.use(bodyParser.json());
app.use(require('method-override')());
app.use(require('cookie-parser')());
app.use(require('cookie-session')({
	secret: 'xish'
}));

var env = process.env.NODE_ENV || 'production';

app.use(express["static"](__dirname + '/public'));
app.use(logger.log4js.connectLogger(logger.access, {
	level: 'auto',
	format: ':method :url :status :response-timems :content-length'
}));

require("./routers/")(app);

app.use(function(req, res, next) {
	var err = new Error('Not Found' + req.originalUrl);
	err.status = 404;
	next(err);
});

if (env == 'development') {
	app.use(require('errorhandler')());
} else {
	app.use(function(err, req, res, next) {
		return res.status(500).send(err.message || '500 status');
	});
}

var server = http.createServer(app);

server.listen(config.PORT);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	var bind = '端口 ' + config.PORT;

	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' 需要提升权限');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' 正在被其他程序使用');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

function onListening() {
	var addr = server.address();
	var bind = typeof addr === 'string' ? '管道 ' + addr : '端口 ' + addr.port;
	console.log('正在监听 ' + bind);
}