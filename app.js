express = require('express');
app = express();
var bodyParser = require('body-parser');
var ejs = require('ejs');
var partials = require('express-partials');
var config = require('./config');
var logger = require('./utils/logger');

app.set('views', __dirname + "/views");
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

// ejs.open = '{{';
// ejs.close = '}}';
app.set('view options', {
	defaultLayout: 'layout'
});

partials.register('.html',require('ejs').render);
app.use(partials());

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

app.use(function (req, res, next) {
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

app.listen(config.PORT, function() {
	console.log("listening on port " + config.PORT + ', env ' + env);
});