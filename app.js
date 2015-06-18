// importar paquetes con middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');

// importar enrutadores
var routes = require('./routes/index');

// crear aplicacion
var app = express();

// instalar generador de vistas EJS
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(favicon(__dirname + '/public/favicon.ico'));
// instalar middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());

// instalar enrutadores, asociar rutas a sus gestores 
app.use('/', routes);

// Resto de rutas genera error 404 de HTTP
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
// Gestion de errores durante el desarollo 
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            errors:[]
        });
    });
}

// production error handler
// no stacktraces leaked to user
// Gestion de errores de produccion 
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        errors:[]
    });
});


module.exports = app;
