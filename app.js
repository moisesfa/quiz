// importar paquetes con middlewares
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var methodOverride = require('method-override');
var session = require('express-session');

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
app.use(cookieParser('quiz-mod6'));
app.use(session());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(partials());


// MIDDLEWARE DE AUTO-LOGOUT
// ========================================================================
app.use(function(req, res, next){

 // Si existe sesion:
 if (req.session.user){
  // Crear la variable de sesion transAntTime en caso de que no exista
  // Tiempo de la transaccion anterior 
  // Si existe => controlar si ha tardado mas de 2 tiempo desde la ultima conexion
  // Si es asi => destruir la sesion
  if (req.session.transAntTime){
    // La función getTime() ... devuelve el tiempo en milisegundos
    var transActTime = new Date().getTime();
    var diferencia = transActTime - req.session.transAntTime;
    // Ver si han transcurrido mas de 2 MINUTOS:
    if (diferencia > (1000*60*2)){
      // Destruir las variables de sesion:
      delete req.session.user;
      delete req.session.transAntTime;
    }else{
      // Almacenar la nueva hora:
      req.session.transAntTime = transActTime;
    }
  }else{
    req.session.transAntTime = new Date().getTime();
  }
}
 next();
});


// Helpers dinamicos:
app.use(function(req, res, next) {

  // si no existe lo inicializa
  if (!req.session.redir) {
    req.session.redir = '/';
  }
  // guardar path en session.redir para despues de login
  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }

  // Hacer visible req.session en las vistas
  res.locals.session = req.session;
  next();
});


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
