// El controlador importa el modelo para poder acceder a la DB
var models = require('../models/models.js');

//GET /quizes/:id
exports.show = function(req, res) {
	models.Quiz.find(req.params.quizId).then(function(quiz){
		res.render('quizes/show', { quiz: quiz});		
	})	
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	models.Quiz.find(req.params.quizId).then(function(quiz){
		if (req.query.respuesta === quiz.respuesta){
		res.render('quizes/answer', {quiz:quiz, respuesta: 'Correcto'});		
		} else {
		res.render('quizes/answer', {quiz:quiz, respuesta: 'Incorrecto'});		
		}		
	})
};

//GET /quizes
exports.index = function(req, res) {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes});		
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