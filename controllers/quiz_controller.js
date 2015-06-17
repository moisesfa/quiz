// El controlador importa el modelo para poder acceder a la DB
var models = require('../models/models.js');

// Autoload - factoriza el codigo si ruta incluye : quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(function(quiz){
		if (quiz) {
			req.quiz = quiz;
			next();			
		} else {
			next(new Error('No existe quizId=' + quizId));
		}
	}).catch(function (error){next (error);});
}; 


//GET /quizes
exports.index = function(req, res) {	
 if(req.query.search) {
    var filtro  = (req.query.search || '').replace(" ", "%");
    models.Quiz.findAll({where:["pregunta like ?", '%'+filtro+'%'],
    	order:'pregunta ASC'}).then(function(quizes){
     	res.render('quizes/index', {quizes: quizes});
    }).catch(function(error) { next(error);});

  } else {
	models.Quiz.findAll().then(function(quizes){
		res.render('quizes/index.ejs', { quizes: quizes});		
	}).catch(function(error){ next (error);});	
	}
};

//GET /quizes/:id
exports.show = function(req, res) {
		res.render('quizes/show', { quiz: req.quiz});		
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
		if (req.query.respuesta === req.quiz.respuesta){
		 resultado = 'Correcto';
		} 
		res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});		
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