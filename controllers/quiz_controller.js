// El controlador importa el modelo para poder acceder a la DB
var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz){
		res.render('quizes/question', {pregunta: quiz[0].pregunta});		
	})	
};

//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().success(function(quiz){
		if (req.query.respuesta === quiz[0].respuesta){
		res.render('quizes/answer', {respuesta: 'Correcto'});		
		} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});		
		}		
	})
};

//GET /author
exports.author = function(req, res) {
	res.render('author', {author: 'Moisés Fernández Arias'});	
};

/*
Con los metodos models.Quiz.findAll() o find() fuscamos los datos en la tabla Quiz
y los procesamos en el callback del metodo success(..)
Usamos findAll() para buscar el array de elementos de la tabla Quiz y como solo 
tiene una pregunta, cogemos el primer elemento quiz[0].
*/