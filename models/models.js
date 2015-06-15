// models.js construye la DB y el modelo omportando quiz.js
// sequelize.sync() construye la DB según define el modelo.

var path = require('path');

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(null,null,null,
						{dialect:"sqlite", storage:"quiz.sqlite"});

// Importar la definicion de la tabla Quiz en quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));
// exportar definicion de tabla Quiz
exports.Quiz = Quiz;

// sequelize.sync() crea e iniializa la tabla de preguntas en DB
// crea automaticamente el fichero quiz.sqlite con la DB y sus datos iniciales, 
// si la DB no existe. Si existe sincroniza con nuevas definiciones del modelo,
// siempre que sean compatibles con anteriores. 
sequelize.sync().success(function(){
	// sueccess(..) ejecuta el manejador una vez creada la tabla
	Quiz.count().success (function (count){
		if(count === 0) {
			Quiz.create({ pregunta: 'Capital de Italia',
						  respuesta: 'Roma'})
			.success(function(){console.log('Base de datos inicializada')});
		};
	});
});

/* El callback de squelize.sync().success(function(){...}) se ejecuta cuando el
fichero quiz.sqlite esta sincronizado. El codigo de esta función introduce en la
DB la pregunta de la version anterior, para que todo funicone igual.
Quiz.count().success(..) devuelve en count el numero de filas de la tabla 
Quiz.create(.. objeto ..) crea la pregunta y la guarda en la tabla.
*/ 